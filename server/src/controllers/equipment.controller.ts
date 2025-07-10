import { Request, Response } from 'express';

import { allEquipmentService, createNewEquipment, deleteEquipmentService, updateEquipmentStatus } from '../services/equipment.service';

export const getAllequipment =  async ( req : Request, res : Response ) => {
    const equipment = await allEquipmentService(  );
    res.status(201).json(equipment);
};

export const newEquipment =  async ( req : Request, res : Response ) => {
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

export const deleteEquipment = async ( req : Request, res : Response ) => {
    const param = req.params;
    await deleteEquipmentService( Number(param.id) );
    res.status(200).json({
        'status' : 'success',
        message : 'equipment successfully deleted',
    });
};