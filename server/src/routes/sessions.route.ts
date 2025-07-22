
import Router               from 'express';

import { allSession, createNewSession } from '../controllers/sessions.controller';
import { validatorBody }    from '../middlewares/validator.middlewares';
import { sessionSchema }    from '../schemas/session.schema';
import { tryCatch }         from '../utils/tryCatch';

const router = Router();

router.post('/', validatorBody( sessionSchema),  tryCatch( createNewSession ));
router.get( '/', tryCatch( allSession ));

export default router;