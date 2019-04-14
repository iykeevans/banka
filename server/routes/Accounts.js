import express from 'express';
import { createAccount, deleteAccount, changeStatus } from '../controllers/Accounts';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, createAccount);
router.delete('/:accountNumber', verifyToken, deleteAccount);
router.patch('/:accountNumber', verifyToken, changeStatus);

export default router;
