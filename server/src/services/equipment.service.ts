
import prisma           from '../db/prisma';
import { newEquipment, status } from '../schemas/equipment.schema';

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
    await prisma.equipment.update({
        where : {
            id : id,
        },
        data : {
            status      : body.status,
        },
    });
}; 