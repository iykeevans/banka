import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { clientLogin, staffLogin } from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;

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

// Transaction test
describe('debit transaction test suite', () => {
  // create debit transaction test
  it('should create a debit transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/debit')
      .send({ amount: 5000 })
      .set('authorization', staffToken)
      .end((err, res) => {
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
      .post('/api/v1/transactions/6171257000/debit')
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
      .post('/api/v1/transactions/6171257000/debit')
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
      .post('/api/v1/transactions/6171257000/debit')
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

describe('Credit transaction test suite', () => {
  // create credit transaction test
  it('should create a credit transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/credit')
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
      .post('/api/v1/transactions/6171257000/credit')
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
      .post('/api/v1/transactions/6171257000/credit')
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
