
import Router                    from 'express';

import { deletePlans, newPLans } from '../controllers/plans.controller';
import { validatorBody, validatorParam } from '../middlewares/validator.middlewares';
import { createNewPlansSchema } from '../schemas/plans.schema';
import { requestById } from '../utils/schema.util';
import { tryCatch } from '../utils/tryCatch';





const router = Router();

router.post('/', validatorBody( createNewPlansSchema ), tryCatch( newPLans ) );
router.delete('/:id', validatorParam( requestById ), tryCatch( deletePlans ));

export default router;