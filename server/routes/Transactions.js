import express from 'express';
import { createTransaction, getTransaction } from '../controllers/Transactions';
import verifyToken from '../middlewares/authentication/verifyToken';
import isStaff from '../middlewares/authentication/staffAuth';

const router = express.Router();

router.get('/:id', verifyToken, getTransaction);
router.post('/:accountNumber/debit', verifyToken, isStaff, createTransaction);
router.post('/:accountNumber/credit', verifyToken, isStaff, createTransaction);

export default router;
