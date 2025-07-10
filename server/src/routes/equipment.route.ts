
import Router                    from 'express';

import { NewEquipment, 
    updateStatusOfequipment }   from '../controllers/equipment.controller';
import { validatorBody, 
    validatorParam }            from '../middlewares/validator.middlewares';
import { createNewEquipmentSchema,
    updateEquipment,
}                               from '../schemas/equipment.schema';
import { requestById }          from '../utils/schema.util';
import { tryCatch }             from '../utils/tryCatch';



const router = Router();

router.post('/', validatorBody( createNewEquipmentSchema ), tryCatch( NewEquipment ) );
router.patch('/:id', validatorBody( updateEquipment ), validatorParam( requestById ), updateStatusOfequipment);

export default router;