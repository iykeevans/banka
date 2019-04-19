import express from 'express';
import {
  createAccount, deleteAccount, changeStatus,
  getHistory, getAccount, getAccounts, getByStatus,
} from '../controllers/Accounts';
import verifyToken from '../middlewares/authentication/verifyToken';
import isStaff from '../middlewares/authentication/staffAuth';

const router = express.Router();

router.get('/', verifyToken, isStaff, getAccounts);
router.get('/:accountNumber', verifyToken, getAccount);
router.get('/:accountNumber/transactions', verifyToken, getHistory);
router.post('/', verifyToken, createAccount);
router.delete('/:accountNumber', verifyToken, isStaff, deleteAccount);
router.patch('/:accountNumber', verifyToken, isStaff, changeStatus);
// TODO: work on this
router.get('/account/account', verifyToken, isStaff, getByStatus);

export default router;
