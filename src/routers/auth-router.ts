import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

export default router;
