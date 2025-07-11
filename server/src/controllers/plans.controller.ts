import { Request, Response } from 'express';

import { createNewPlans, deletePlansService, getAllPlans, updatePlansService } from '../services/plans.service';


export const allPLan =  async ( req : Request, res : Response ) => {
    const plans = await getAllPlans( );
    res.status(200).json( plans );
};

export const newPLan =  async ( req : Request, res : Response ) => {
    const body = req.body;
    await createNewPlans( body );
    res.status(201).json({
        'status' : 'success',
        message : 'New plan created successfully',
    });
};

export const deletePlan = async ( req : Request, res : Response ) => {
    const param = req.params;
    await deletePlansService( Number(param.id) );
    res.status(200).json({
        'status' : 'success',
        message : 'Plan successfully deleted',
    });
};

export const updatePlan = async ( req : Request, res : Response ) => {
    const param = req.params;
    const body = req.body;
    await updatePlansService( body, Number(param.id) );
    res.status(200).json({
        'status' : 'success',
        message : 'Plan successfully updated',
    });
};