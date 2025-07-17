
import Router               from 'express';

import { getSLotUsingDay }  from '../controllers/slot.controller';
import { validatorParam, 
    validatorQuery }        from '../middlewares/validator.middlewares';
import { is_vipSchema, 
    requestByDay }          from '../schemas/slot.schema';
import { tryCatch }         from '../utils/tryCatch';



const router = Router();


router.get('/:day', validatorParam( requestByDay ), validatorQuery( is_vipSchema ), tryCatch( getSLotUsingDay ));

export default router;