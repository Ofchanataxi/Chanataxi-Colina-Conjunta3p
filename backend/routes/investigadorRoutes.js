import { Router } from 'express';
const router = Router();

import {
  getAllInvestigadores,
  getInvestigadorById,
  createInvestigador,
  updateInvestigador,
  deleteInvestigador
} from '../controllers/investigadorController.js';

router.get('/investigadores', getAllInvestigadores);
router.get('/investigadores/:id', getInvestigadorById);
router.post('/investigadores', createInvestigador);
router.put('/investigadores/:id', updateInvestigador);
router.delete('/investigadores/:id', deleteInvestigador);

export default router;