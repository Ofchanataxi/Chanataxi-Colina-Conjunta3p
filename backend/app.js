
// app.js
import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import investigadorRoutes from './routes/investigadorRoutes.js';
import disponibilidadRoutes from './routes/disponibilidadRoutes.js';
import lineaInvestigacionRoutes from './routes/lineaInvestigacionRoutes.js';
import grupoRoutes from './routes/grupoRoutes.js';


const app = express();

app.use(json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('Hola mundo'));

// Rutas principales
//app.use('/api', categoriaRoutes);
app.use('/api', investigadorRoutes);
app.use('/api', disponibilidadRoutes);
app.use('/api', lineaInvestigacionRoutes);
app.use('/api', grupoRoutes);



export default app;
