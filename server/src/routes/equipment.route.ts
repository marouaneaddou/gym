
import Router                    from 'express';

import { deleteEquipment, getAllequipment, newEquipment, 
    updateStatusOfequipment }   from '../controllers/equipment.controller';
import { errorHandler } from '../middlewares/error.middlewares';
import { validatorBody, 
    validatorParam }            from '../middlewares/validator.middlewares';
import { createNewEquipmentSchema,
    updateEquipment,
}                               from '../schemas/equipment.schema';
import { requestById }          from '../utils/schema.util';
import { tryCatch }             from '../utils/tryCatch';



const router = Router();

router.get('/', tryCatch( getAllequipment ) );
router.post('/', validatorBody( createNewEquipmentSchema ), tryCatch( newEquipment ) );
router.patch('/:id', validatorBody( updateEquipment ), validatorParam( requestById ), tryCatch( updateStatusOfequipment ));
router.delete('/:id', validatorParam( requestById ), tryCatch( deleteEquipment ));


router.use(errorHandler);

export default router;