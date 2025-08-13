import { Router } from 'express';
const router = Router();

import {
  getAllGrupos,
  formarGruposAutomaticamente,
  getMiembrosGrupo,
  crear_asignacion
} from '../controllers/grupoController.js';

router.get('/grupos', getAllGrupos);
router.post('/grupos/formar-automaticamente', formarGruposAutomaticamente);
router.get('/grupos/:id/miembros', getMiembrosGrupo);
router.post('/asignaciones', crear_asignacion); // Corregida ruta más clara

export default router;