import express from 'express';
import { signup, login, userAccounts } from '../controllers/Users';
import verifyToken from '../middlewares/authentication/verifyToken';
import staffAuth from '../middlewares/authentication/staffAuth';

const router = express.Router();

router.get('/api/v1/user/:email/accounts', verifyToken, staffAuth, userAccounts);
router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', login);

export default router;
