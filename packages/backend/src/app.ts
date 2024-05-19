import express from 'express';
import campaignRoutes from './routes/campaignRoutes';
import characterRoutes from './routes/characterRoutes';
import sessionRoutes from './routes/sessionRoutes';

const app = express();

app.use(express.json());
app.use('/campaigns', campaignRoutes);
app.use('/characters', characterRoutes);
app.use('/sessions', sessionRoutes);

export default app;