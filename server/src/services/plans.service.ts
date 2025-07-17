import prisma           from '../db/prisma';
import { newPLans, updatePLans } from '../schemas/plans.schema';
import { AppError } from '../utils/appError';


export const getAllPlans = async (  )  => (await prisma.plan.findMany({
    orderBy: [
        { is_vip: 'asc' },         
        { max_days_per_week: 'asc' },
    ],
}));

export const checkIsExistPlanVIP = async ( ) => (await prisma.plan.findMany({
    where : {
        is_vip : true,
    },
}));

export const createNewPlans = async ( body : newPLans )  => {
    if ( body.is_vip && body.is_vip == true ) {
        const vip = await checkIsExistPlanVIP();
        if ( vip.length > 0 ) {
            throw new AppError( 'Plan VIP is exist you must updated not create new one', 400 );
        }
    }
    await prisma.plan.create({
        data : {
            max_days_per_week   :   body.max_days_per_week,
            type                :   body.type,
            is_vip              :   body.is_vip ? body.is_vip : false,
            description         :   body.description,
            duration            :   body.duration,
            price               :   body.price,
            seance              :   body.seance,
        },
    });
};

export const deletePlansService = async ( id : number )  => {
    try {
        await prisma.plan.delete({
            where : {
                id : id,
            },
        });
    }
    catch ( error ) {
        console.error( error );
        throw new AppError( 'Plan not found', 404 );
    }
}; 

export const updatePlansService = async ( body : updatePLans, id : number )  => {
    try {
        await prisma.plan.update({
            where : {
                id : id,
            },
            data : body,
        });
    }
    catch ( error ) {
        console.error( error );
        throw new AppError( 'Plan not found', 404 );
    }
}; 