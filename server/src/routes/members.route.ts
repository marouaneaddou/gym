
import Route                from 'express';

import { addUserToSession, getAllMmber, 
    getAllPaymentUser,
    getSlotsUser,
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
router.get('/:id/slots', validatorParam( requestById ), validatorQuery(queryLatestSlot), tryCatch( getSlotsUser ));
router.post('/', validatorBody( memberSchemas ), tryCatch( newMember ));
router.post('/:id/sessions', validatorParam( requestById ), validatorBody( userSessions), tryCatch( addUserToSession ) );

export default router;