
import Router                    from 'express';

import { allPLan, 
    deletePlan, 
    newPLan, 
    updatePlan }                from '../controllers/plans.controller';
import { validatorBody,
    validatorParam }            from '../middlewares/validator.middlewares';
import { createNewPlansSchema, 
    updatePlansSchema }         from '../schemas/plans.schema';
import { requestById }          from '../utils/schema.util';
import { tryCatch }             from '../utils/tryCatch';





const router = Router();

router.get('/', tryCatch( allPLan ) );
router.post('/', validatorBody( createNewPlansSchema ), tryCatch( newPLan ) );
router.delete('/:id', validatorParam( requestById ), tryCatch( deletePlan ) );
router.put('/:id', validatorParam( requestById ), validatorBody( updatePlansSchema ), tryCatch( updatePlan ) );

export default router;