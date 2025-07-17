import { Request, Response } from 'express';

import { slotUsingDay } from '../services/slot.service';


export const getSLotUsingDay =  async ( req : Request, res : Response ) => {
    const query = req.query;
    const param = req.params;
    console.error(Boolean(query.is_vip));
    const slots = await slotUsingDay( param.day, Boolean(query.is_vip == 'true'));
    res.json( slots );
};