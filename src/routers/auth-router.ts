import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.get('/login', authController.login);

export default router;
