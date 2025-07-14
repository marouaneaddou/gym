
import cors             from 'cors';
import express          from 'express';

import { errorHandler } from './middlewares/error.middlewares';
import { verfyToken }   from './middlewares/verifyToken.middleware';
import userRoutes       from './routes/auth.route';
import equipmentRoutes  from './routes/equipment.route';
import planRoutes       from './routes/plans.route';
import slotRoutes       from './routes/slot.route';

const app = express();

app.use(cors());

app.use(express.json());

app.use( '/api/auth', userRoutes );
app.use( '/api/equipment', equipmentRoutes );
app.use( '/api/plan',       verfyToken, planRoutes );
app.use( '/api/slot',        slotRoutes );

app.use(errorHandler);

export default app;