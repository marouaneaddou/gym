

import { Prisma }       from '@prisma/client';

import { config, 
    dailySlots }        from '../config';
import prisma           from '../db/prisma';
import { Days, 
    MembershipData,
    Payment,
    Slots,
    UserInfo,
    UserSLot,
}                       from '../types/member.type';
import { AppError }     from '../utils/appError';

export const userInfo = async ( email : string, nationalId : string ) => {

    const user = await prisma.user.findUnique({
        where : {
            email,
            nationalId,
        },
    });
    return user;
};
export const createUser = async ( body : UserInfo ) => {
    try {
        const user = await prisma.user.create({
            data : body,
        });
        return user;
    }
    catch ( error ) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === 'P2002') {
                throw new AppError( 'User already exists', 409 );
            }
        }
        throw ( error );
    }
};



export const getPLanData = async ( id : number ) => {
    const plan = await prisma.plan.findUnique({
        where : {
            id : id,
        },
    });
    if ( !plan ) {
        throw new AppError( 'PLan pracing not found', 404 );
    }
    return plan;
};

function addMonthsHandlingDayOverflow(startDate : Date, monthsToAdd : number) {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    const targetMonth = month + monthsToAdd;

    const tentativeDate = new Date(year, targetMonth, day);

    // getMonth() is zero-based (Jan = 0)
    // if day doesn't exist in target month, date overflows to next month
    // so if months don't match, return last day of target month
    if (tentativeDate.getMonth() !== (targetMonth % 12)) {
        return new Date(year, targetMonth + 1, 0);
    }
    return tentativeDate;
}

export const createMembership = async ( body :  MembershipData ) => {
    const plan = await getPLanData( Number(body.planId));

    const lastDate = addMonthsHandlingDayOverflow( body.startDate, plan.duration );
    const membership =  await prisma.membership.create({
        data : {
            userId      :   body.userId,
            startDate   :   new Date(body.startDate),
            endDate     :   lastDate,
            planId      :   body.planId,
            pricePaid   :   body.pricePaid,
        },
    });
    return membership;
};

export const newPayment = async ( body : Payment ) => {
    await prisma.payment.create({
        data : {
            membershipId :  body.membershipId,
            amount       :  body.amount,
        },
    });
};


export const validateSeance = async ( body : Slots, numberSeance : number ) => {
    const seanceDay = [];

    // check seance date is valid
    for ( const day of body ) {
        if ( day.seance.length > numberSeance ) 
            throw new AppError(`Each day must have exactly ${numberSeance} seances`, 400);
        for ( const seance of day.seance ) {
            const slot = dailySlots.find(slot => slot.startTime === seance);
            if (!slot) {
                throw new AppError(`Invalid seance start time: ${seance}`, 400);
            }
            seanceDay.push(`${day.day}_${seance}`);
        }
    }

    if ( new Set(seanceDay).size != seanceDay.length )
        throw new AppError('Do not use duplicate seance', 400);
    // get all seance data
    // example of data fetched from db 
    // [
    //      { dayOfWeek: 'Monday', startTime: '07:30' },
    //      { dayOfWeek: 'Monday', startTime: '19:30' },
    //      { dayOfWeek: 'Tuesday', startTime: '13:30' }
    // ]
    const slots = await prisma.slotTemplate.findMany({
        where : {
            OR : Array.from(seanceDay).map( (pair : string ) => {
                const [dayOfWeek, startTime] = pair.split('_');
                return { dayOfWeek, startTime };
            }),
        },
        select : {
            id          :   true,
            dayOfWeek   :   true,
            startTime   :   true,
        },
    });

    // Build lookup map
    const slotsMap = new Map<string, number>();
    for (const slot of slots) {
        slotsMap.set(`${slot.dayOfWeek}_${slot.startTime}`, slot.id);
    }

    // Build result
    const result: Days = [];
    for (const day of body) {
        const seanceIds: number[] = [];
        for (const seance of day.seance) {
            const id = slotsMap.get(`${day.day}_${seance}`);
            if (!id)
                throw new AppError(`Invalid seance start time : ${seance}`, 400);
            seanceIds.push(id);
        }
        result.push({ day: day.day, ids: seanceIds });
    }

    // const result : Days = [];

    // for ( const day of body ) {
    //     if ( day.seance.length != numberSeance ) 
    //         throw new AppError(`Each day must have exactly ${numberSeance} seances`, 400);

    //     const seanceIds: number[] = [];
    //     for ( const seance of day.seance ) {
    //         const slot = dailySlots.find(slot => slot.startTime === seance);
    //         if (!slot) {
    //             throw new AppError(`Invalid seance start time: ${seance}`, 400);
    //         }
    //         const seanceDb = await prisma.slotTemplate.findFirst({
    //             where : {
    //                 startTime : seance,
    //                 dayOfWeek : day.day,
    //             },
    //             select : {
    //                 id : true,
    //             },
    //         });
    //         if ( !seanceDb ) 
    //             throw new AppError(`Invalid seance start time: ${seance}`, 400);
    //         seanceIds.push( seanceDb?.id );
    //     }

    //     result.push({
    //         day : day.day,
    //         ids : seanceIds,
    //     });
    // }
    return result;
};

export const checkSeancesNotFull = async ( days : Days, isVip : boolean ) => {
    const allIds = days.flatMap(day => day.ids);

    const counts = await prisma.userSlot.groupBy({
        by : ['slotTemplateId'],
        where : {
            slotTemplateId: { in : allIds },
            isVip : isVip,
        },
        _count : true,
    });


    if (counts.length === 0) return;

    const idsCount = new Map();

    for ( const item of counts ) {
        idsCount.set( item.slotTemplateId, item._count);
    }
    
    for (const [id, count] of idsCount) {
        if (
            (isVip && count >= config.capacity_vip) ||
            (!isVip && count >= config.capacity_basic)
        ) {
            throw new AppError('The seance is at full capacity', 400);
        }
    }

    // for ( const day of days ) {
    //     for ( const id of day.ids ) {
    //         const count = await prisma.userSlot.count({
    //             where : {
    //                 slotTemplate : {
    //                     id : id,
    //                 },
    //                 isVip : isVip,
    //             },
    //         });

    //         if ( isVip == true && count == config.capacity_vip ) 
    //             throw new AppError('The seance is at full capacity', 400);
    //         else if ( isVip == false && count == config.capacity_basic )
    //             throw new AppError('The seance is at full capacity', 400);
    //     }
    // }

};

export const createUserSlot = async ( body : UserSLot ) => {

    const date = new Date();
    const userSlotData = body.seanceIds.flatMap( day => 
        day.ids.map( id => ({
            userId          : body.userId,
            slotTemplateId  : id,
            isVip : body.plan.is_vip,
            date  : date,
        })),
    );
    try {
        await prisma.userSlot.createMany({
            data : userSlotData,
        });
    }
    catch {
        throw new AppError( 'Eroor in creation user booked slots', 500 );
    }
};

