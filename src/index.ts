import './utils/dotenv';
import { app } from './server';
import routes from './routes/index';

app.use('/', routes);

app.use((err: any, req: any, res: any) => res.status(500).send({ error: err.message }));
