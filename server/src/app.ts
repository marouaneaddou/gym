
import express          from 'express';

import userRoutes       from './routes/auth.route';
import equipmentRoutes  from './routes/equipment.route';

const app = express();

app.use(express.json());

app.use( '/api/auth', userRoutes );
app.use( '/api/equipment', equipmentRoutes );

export default app;