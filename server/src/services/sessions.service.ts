import { config } from '../config';
import prisma       from '../db/prisma';

type  body = {
    startTime : number, 
    endTime : number, 
    day :  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
}

export const checkConflictSession = async ( body : body ) => {

    const count = await prisma.session.findMany({
        where : {
            day : body.day,
            AND : [
                {
                    startTime : {
                        lt : body.endTime,
                    },
                },
                {
                    endTime : {
                        gt : body.startTime,
                    },
                },
            ],
        },
    });

    return count;
};

export const newSession = async ( body : body ) => {

    await prisma.session.create({
        data : body,
    });

};

// export const getAllSession = async ( ) => (
//     await prisma.session.findMany({
//         orderBy: [
//             { day: 'asc' }, 
//             { startTime: 'asc' }, 
//         ],
//         include : {
//             user : {
//                 select : {
//                     trainerId : true,
//                 },
//             },
//         },
//     }));

export const getAllSession = async ( ) => {
    let sessions = await prisma.session.findMany({
        orderBy: [
            { day: 'asc' }, 
            { startTime: 'asc' }, 
        ],
        include : {
            user : {
                select : {
                    trainerId : true,
                },
            },
        },
    });

    return sessions.map(session => ({
        ...session,
        status_basic: session.user.length > config.capacity_basic ? 'over_capacity' : 'available',
        status_vip: session.user.length > config.capacity_vip ? 'over_capacity' : 'available',
    }));
};
