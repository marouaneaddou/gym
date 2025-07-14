
import Router, { Request, Response } from 'express';

import { dailySlots } from '../config';
import prisma from '../db/prisma';
import { validatorParam, validatorQuery } from '../middlewares/validator.middlewares';
import { is_vipSchema, requestByDay } from '../schemas/slot.schema';
import { tryCatch } from '../utils/tryCatch';
import { getSLotUsingDay } from '../controllers/slot.controller';


const router = Router();


router.get('/:day', validatorParam( requestByDay ), validatorQuery( is_vipSchema ), tryCatch( getSLotUsingDay ));

export default router;