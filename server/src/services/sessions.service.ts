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

export const getAllSession = async ( ) => (
    await prisma.session.findMany({
        orderBy: [
            { day: 'asc' }, 
            { startTime: 'asc' }, 
        ],
    })
);
