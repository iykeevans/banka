import express from 'express';
import { signup, login, userAccounts } from '../controllers/Users';
import verifyToken from '../middlewares/authentication/verifyToken';
import isStaff from '../middlewares/authentication/staffAuth';

const router = express.Router();

router.get('/api/v1/user/:email/accounts', verifyToken, isStaff, userAccounts);
router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', login);

export default router;
