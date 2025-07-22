
import cors             from 'cors';
import express          from 'express';

import { errorHandler } from './middlewares/error.middlewares';
import userRoutes       from './routes/auth.route';
import equipmentRoutes  from './routes/equipment.route';
import memberRoutes     from './routes/members.route';
import planRoutes       from './routes/plans.route';
import sessionRoute     from './routes/sessions.route';
import slotRoutes       from './routes/slot.route';

const app = express();

app.use(cors());

app.use(express.json());

app.use( '/api/auth', userRoutes );
app.use( '/api/equipments', equipmentRoutes ); //verfyToken
app.use( '/api/plans', planRoutes );//verfyToken
app.use( '/api/slots',       slotRoutes );//verfyToken
app.use( '/api/members',        memberRoutes );//verfyToken
app.use( '/api/sessions',        sessionRoute );//verfyToken

app.use(errorHandler);

export default app;