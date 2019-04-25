import express from 'express';
import { createTransaction, getTransaction } from '../controllers/Transactions';
import verifyToken from '../middlewares/authentication/verifyToken';
import cashierAuth from '../middlewares/authentication/cashierAuth';

const router = express.Router();

router.get('/:id', verifyToken, getTransaction);
router.post('/:accountNumber(\\d+)/debit', verifyToken, cashierAuth, createTransaction);
router.post('/:accountNumber(\\d+)/credit', verifyToken, cashierAuth, createTransaction);

export default router;
