
import Route                from 'express';

import { newMember }        from '../controllers/members.controller';
import { validatorBody }    from '../middlewares/validator.middlewares';
import { createNewMemberBody } from '../schemas/members.schema';
import { tryCatch }         from '../utils/tryCatch';

const router = Route();
// , 
router.get('/')
router.post('/', validatorBody( createNewMemberBody ), tryCatch( newMember ));
export default router;