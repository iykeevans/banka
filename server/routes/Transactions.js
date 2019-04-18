import express from 'express';
import transaction from '../controllers/Transactions';
import verifyToken from '../middlewares/verifyToken';
import { debit, credit } from '../middlewares/transactionType';

const router = express.Router();

router.post('/:accountNumber/debit', verifyToken, debit, transaction);
router.post('/:accountNumber/credit', verifyToken, credit, transaction);

export default router;
