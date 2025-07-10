
import prisma           from '../db/prisma';
import { newEquipment, status } from '../schemas/equipment.schema';
import { AppError } from '../utils/appError';

export const allEquipmentService = async ( )  => (await prisma.equipment.findMany({}));


export const createNewEquipment = async ( body : newEquipment )  => {
    await prisma.equipment.create({
        data : {
            name        : body.name,
            status      : body.status,
            type        : body.type,
            brand       : body.brand,
        },
    });
};

export const updateEquipmentStatus = async ( body : status, id : number )  => {
    try {
        await prisma.equipment.update({
            where : {
                id : id,
            },
            data : {
                status      : body.status,
            },
        });
    }
    catch ( error  ) {
        console.error( error );
        throw new AppError( 'Equipment not found', 404 );
    }
}; 

export const deleteEquipmentService = async ( id : number )  => {
    try {
        await prisma.equipment.delete({
            where : {
                id : id,
            },
        });
    }
    catch ( error ) {
        console.error( error );
        throw new AppError( 'Equipment not found', 404 );
    }
}; 