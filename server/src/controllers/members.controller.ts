

import { Request, 
    Response }          from 'express';
import { StatusCodes }  from 'http-status-codes';

import prisma           from '../db/prisma';
import { 
    createMembership, 
    createUser, 
    getAllPayment, 
    getPLanData,
    latestDate,
    newPayment, 
    saveDbUserSession, 
    userById, 
    userInfo }    from '../services/member.service';
import { AppError }     from '../utils/appError';

export const newMember = async ( req : Request, res : Response ) => {
    const body = req.body;
    const userChcek = await userInfo( body.email, body.nationalId );
    if ( userChcek != null ) 
        throw new AppError( 'User already exists', 409 );
    // Check slot days
    // const plan =  await getPLanData( Number(body.planId));
    // // console.error( plan.max_days_per_week)
    // if ( body.slot.length != plan.max_days_per_week ) {
    //     throw new AppError( 'Invalid day plan: slot count does not match max days per week', StatusCodes.BAD_REQUEST );
    // }
    // if ( body.pricePaide != plan.price ) {
    //     throw new AppError( `Payment mismatch: expected ${plan.price}`, StatusCodes.BAD_REQUEST);
    // }
    // check seance date is exist and get ids of seance
    // const idsSeanceOfDay = await validateSeance( body.slot, plan.seance );

    // check seance is not full
    // await checkSeancesNotFull( idsSeanceOfDay, plan.is_vip );
    // Create new member
    const user = await createUser( {
        firstName   :   body.firstName,
        lastName    :   body.lastName,
        email       :   body.email,
        phone       :   body.phone,
        gender      :   body.gender,
        nationalId  :   body.nationalId,
    });

    // Create new membersheep
    const membership = await createMembership( {
        userId      : user.id,
        planId      : body.planId,
        startDate   : new Date( body.startDate ),
        pricePaid   : body.pricePaide,
    });

    await newPayment( {
        membershipId :  membership.id,
        amount       :  body.pricePaide,
    });
    // member slots booked 
    // await createUserSlot( {
    //     seanceIds    :   idsSeanceOfDay,
    //     userId       :   user.id,
    //     plan         :   plan,
    // });

    res.status(StatusCodes.CREATED).json({
        message     : 'Account member created successfully',
        userId      :   user.id,
    });

};

// export const newMember = async ( req : Request, res : Response ) => {
//     const body = req.body;
//     const userChcek = await userInfo( body.email, body.nationalId );
//     if ( userChcek != null ) 
//         throw new AppError( 'User already exists', 409 );

// }

export const getAllMmber = async ( req : Request, res : Response ) => {
    const member = await prisma.user.findMany({

    });
    res.status( StatusCodes.OK ).json( member );

};

export const addUserToSession = async ( req : Request, res : Response ) => {

    const { id } = req.params;
    const body = req.body;
    const user = await userById( Number( id ) );

    if ( ! user ) {
        throw new AppError( 'User not found', 404 );
    }
    
    const plan =  await getPLanData( user.memberships[0].planId );
    // console.error( plan.max_days_per_week)
    if ( body.length != plan.max_days_per_week ) {
        throw new AppError( 'Invalid session count in week', StatusCodes.BAD_REQUEST );
    }
    await saveDbUserSession( user.id, body, plan.is_vip );

    res.status( StatusCodes.CREATED ).json({
        status : 'Success',
        message : 'Session user booked successfully',
    });
};

export const getAllPaymentUser = async (  req : Request, res : Response ) => {
    const id = Number(req.params.id);

    const user = await userById( id );
    if ( !user ) 
        throw new AppError( 'User not found', 404 );
    const payment = await getAllPayment( id );

    return res.status( StatusCodes.OK).json( payment );
};

export const getSlotsUser = async ( req : Request, res : Response ) => {
    const id = Number(req.params.id);

    const user = await userById( id );
    if ( !user ) 
        throw new AppError( 'User not found', 404 );

    let date;

    if ( req.query.latestMembership && req.query.latestMembership === 'true' ) {
        const membersheep = await latestDate( id );
        date = membersheep?.date;
    }
    console.error( date );
    const userSLot = await prisma.userSlot.findMany({
        where : {
            date : date,
            userId : id,
        },
        select : {
            slotTemplate : {
                select : {
                    dayOfWeek : true,
                    startTime : true,
                    endTime     : true,
                },
            },
            isVip : true,
        },
    });
    return res.status( StatusCodes.OK).json( userSLot );
    // res.send("test")
};