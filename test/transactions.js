import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { clientLogin, staffLogin } from './mockData/user';
import { goodAccount } from './mockData/accounts';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let transactionID;
let accountnumber;

describe('Create user token', () => {
  // sign in user (client) test
  it('should signin client', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(clientLogin)
      .end((err, res) => {
        clientToken = `Bearer ${res.body.data.token}`;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // sign in user (staff) test
  it('should signin staff', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(staffLogin)
      .end((err, res) => {
        staffToken = `Bearer ${res.body.data.token}`;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
});

// Account test
describe('Create account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', clientToken)
      .send(goodAccount)
      .end((err, res) => {
        accountnumber = res.body.data.accountNumber;
        console.log('=====------->', accountnumber);
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
});

// Transaction test
describe('debit transaction test suite', () => {
  // create debit transaction test
  it('should create a debit transaction', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/debit`)
      .send({ amount: 5000 })
      .set('authorization', staffToken)
      .end((err, res) => {
        transactionID = res.body.data.transactionId;
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.transactionType).to.equal('debit');
        done();
      });
  });

  // create debit transaction error test
  it('should return a debit transaction user type error', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/debit`)
      .send({ amount: 5000 })
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // transaction amount test
  it('should return a transaction error', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/debit`)
      .send({ amount: 50000 })
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test validation
  it('should return a debit transaction validation error', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/debit`)
      .send({ amount: '' })
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test to check for wrong account number
  it('should return a debit transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257141/debit')
      .send({ amount: 5000 })
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Credit transaction test suite', () => {
  // create credit transaction test
  it('should create a credit transaction', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/credit`)
      .send({ amount: 5000 })
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.transactionType).to.equal('credit');
        done();
      });
  });

  // create credit transaction error test
  it('should return a credit transaction user type error', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/credit`)
      .send({ amount: 5000 })
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test validation
  it('should return a credit transaction validation error', (done) => {
    chai
      .request(app)
      .post(`/api/v1/transactions/${accountnumber}/credit`)
      .send({ amount: '' })
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('view account transaction history Test suite', () => {
  it('should return all transactions history for an account', (done) => {
    chai
      .request(app)
      .get(`/api/v1/accounts/${accountnumber}/transactions`)
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should return all an empty account transaction history', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/6171257101/transactions')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should return an error for invalid account number', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/----llkkk/transactions')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('view specific transaction history Test suite', () => {
  it('should return a transactions history', (done) => {
    chai
      .request(app)
      .get(`/api/v1/transactions/${transactionID}`)
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should return an error for invalid account number', (done) => {
    chai
      .request(app)
      .get('/api/v1/transactions/----llkkk')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
