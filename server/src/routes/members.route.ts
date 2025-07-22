
import Route                from 'express';

import { addUserToSession, getAllMmber, 
    getAllPaymentUser,
    getSessionsUser,
    newMember }             from '../controllers/members.controller';
import { validatorBody, 
    validatorParam, 
    validatorQuery }        from '../middlewares/validator.middlewares';
import { 
    memberSchemas, 
    queryLatestSlot, 
    userSessions }       from '../schemas/members.schema';
import { requestById }      from '../utils/schema.util';
import { tryCatch }         from '../utils/tryCatch';

const router = Route();

router.get('/', tryCatch( getAllMmber ));
router.get('/:id/payments', validatorParam( requestById ), tryCatch( getAllPaymentUser ));
router.get('/:id/session', validatorParam( requestById ), validatorQuery(queryLatestSlot), tryCatch( getSessionsUser ));
router.post('/', validatorBody( memberSchemas ), tryCatch( newMember ));
router.post('/:id/sessions', validatorParam( requestById ), validatorBody( userSessions), tryCatch( addUserToSession ) );

export default router;