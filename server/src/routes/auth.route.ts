
import { Router } from 'express';

import { createAccount, 
    login }                 from '../controllers/auth.controller';
import { validatorBody }    from '../middlewares/validator.middlewares';
import { account, 
    loginSchema }           from '../schemas/auth.schema';
import { tryCatch }         from '../utils/tryCatch';


const router = Router();

router.post('/login', validatorBody( loginSchema ), tryCatch( login ) );
router.post('/account', validatorBody( account ), tryCatch( createAccount ));

export default router;