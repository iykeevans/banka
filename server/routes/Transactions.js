import express from 'express';
import transaction from '../controllers/Transactions';
import verifyToken from '../middlewares/authentication/verifyToken';
import isStaff from '../middlewares/authentication/staffAuth';

const router = express.Router();

router.post('/:accountNumber/debit', verifyToken, isStaff, transaction);
router.post('/:accountNumber/credit', verifyToken, isStaff, transaction);

export default router;
