import { Router } from 'express';
const router = Router();

import {
  getAllDisponibilidades,
  getDisponibilidadById,
  createDisponibilidad,
  updateDisponibilidad,
  deleteDisponibilidad
} from '../controllers/disponibilidadController.js';

router.get('/disponibilidades', getAllDisponibilidades);
router.get('/disponibilidades/:id', getDisponibilidadById);
router.post('/disponibilidades', createDisponibilidad);
router.put('/disponibilidades/:id', updateDisponibilidad);
router.delete('/disponibilidades/:id', deleteDisponibilidad);

export default router;