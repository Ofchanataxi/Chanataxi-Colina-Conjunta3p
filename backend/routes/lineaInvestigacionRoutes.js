import { Router } from 'express';
const router = Router();

import {
  getAllLineasInvestigacion,
  getLineaInvestigacionById,
  createLineaInvestigacion
} from '../controllers/lineaInvestigacionController.js';

router.get('/lineas-investigacion', getAllLineasInvestigacion);
router.get('/lineas-investigacion/:id', getLineaInvestigacionById);
router.post('/lineas-investigacion', createLineaInvestigacion);

export default router;