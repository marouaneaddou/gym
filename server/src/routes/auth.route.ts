
import { Router } from 'express';

import { register } from '../controllers/auth.controller';
import { tryCatch } from '../utils/tryCatch';


const router = Router();


router.post('/register', tryCatch( register ));


export default router;