
import cors             from 'cors';
import express          from 'express';

import { errorHandler } from './middlewares/error.middlewares';
import { verfyToken }   from './middlewares/verifyToken.middleware';
import userRoutes       from './routes/auth.route';
import equipmentRoutes  from './routes/equipment.route';
import memberRoutes     from './routes/members.route';
import planRoutes       from './routes/plans.route';
import slotRoutes       from './routes/slot.route';

const app = express();

app.use(cors());

app.use(express.json());

app.use( '/api/auth', userRoutes );
app.use( '/api/equipments', verfyToken, equipmentRoutes ); //verfyToken
app.use( '/api/plans', verfyToken, planRoutes );//verfyToken
app.use( '/api/slots', verfyToken,       slotRoutes );//verfyToken
app.use( '/api/members', verfyToken,        memberRoutes );//verfyToken

app.use(errorHandler);

export default app;