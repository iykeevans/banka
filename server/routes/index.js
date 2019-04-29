import express from 'express';
import user from './Users';
import account from './Accounts';
import transaction from './Transactions';

const router = express.Router();

router.all('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to my Banka app',
  });
});

router.all('/api/v1', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to my Banka API',
  });
});

router.use(user);
router.use('/api/v1/accounts', account);
router.use('/api/v1/transactions', transaction);

export default router;
