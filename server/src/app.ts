
import express          from 'express';

import userRoutes       from './routes/auth.route';
import equipmentRoutes  from './routes/equipment.route';
import planRoutes       from './routes/plans.route';

const app = express();

app.use(express.json());

app.use( '/api/auth', userRoutes );
app.use( '/api/equipment', equipmentRoutes );
app.use( '/api/plan', planRoutes );

export default app;