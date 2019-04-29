import express from 'express';
import {
  createAccount, deleteAccount, changeStatus,
  getHistory, getAccount, getAccounts,
} from '../controllers/Accounts';
import verifyToken from '../middlewares/authentication/verifyToken';
import staffAuth from '../middlewares/authentication/staffAuth';
import adminAuth from '../middlewares/authentication/adminAuth';

const router = express.Router();

router.get('/', verifyToken, staffAuth, getAccounts);
router.get('/:accountNumber(\\d+)', verifyToken, getAccount);
router.get('/:accountNumber(\\d+)/transactions', verifyToken, getHistory);
router.post('/', verifyToken, createAccount);
router.delete('/:accountNumber(\\d+)', verifyToken, staffAuth, deleteAccount);
router.patch('/:accountNumber(\\d+)', verifyToken, adminAuth, changeStatus);

export default router;
