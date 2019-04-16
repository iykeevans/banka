import express from 'express';
import transaction from '../controllers/Transactions';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/:accountNumber/debit', verifyToken, transaction);
router.post('/:accountNumber/credit', verifyToken, transaction);

export default router;
