import { Request, Response } from 'express';

import { createNewPlans, deletePlansService } from '../services/plans.service';

export const newPLans =  async ( req : Request, res : Response ) => {
    const body = req.body;
    await createNewPlans( body );
    res.status(201).json({
        'status' : 'success',
        message : 'New plans created successfully',
    });
};

export const deletePlans = async ( req : Request, res : Response ) => {
    const param = req.params;
    await deletePlansService( Number(param.id) );
    res.status(200).json({
        'status' : 'success',
        message : 'equipment successfully deleted',
    });
};