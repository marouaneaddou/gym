import prisma           from '../db/prisma';
import { newPLans } from '../schemas/plans.schema';
import { AppError } from '../utils/appError';

export const createNewPlans = async ( body : newPLans )  => {
    await prisma.plans.create({
        data : {
            max_days_per_week   :   body.max_days_per_week,
            type                :   body.type,
            description         :    body.description,
            duration            :   body.duration,
            price               :   body.price,
        },
    });
};

export const deletePlansService = async ( id : number )  => {
    try {
        await prisma.plans.delete({
            where : {
                id : id,
            },
        });
    }
    catch ( error ) {
        console.error( error );
        throw new AppError( 'PLnas not found', 404 );
    }
}; 