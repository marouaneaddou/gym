import { Request, Response } from 'express';

import { createNewEquipment, updateEquipmentStatus } from '../services/equipment.service';

export const NewEquipment =  async ( req : Request, res : Response ) => {
    const body = req.body;
    await createNewEquipment( body );
    res.status(201).json({
        'status' : 'success',
        message : 'New equipment created successfully',
    });
};

export const updateStatusOfequipment = async ( req : Request, res : Response ) => {
    const param = req.params;
    const body = req.body;
    await updateEquipmentStatus( body, Number(param.id));
    res.status(201).json({
        'status' : 'success',
        message : 'Status equipment changed successfully',
    });
};