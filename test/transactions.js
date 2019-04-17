import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { goodLogin } from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

describe('Create user token', () => {
  it('should signin user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(goodLogin)
      .end((err, res) => {
        userToken = `Bearer ${res.body.data.token}`;
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
  // create transaction test
  it('should create a transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/debit')
      .send({ amount: 5000 })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.transactionType).to.equal('debit');
        done();
      });
  });

  // transaction amount test
  it('should return a transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/debit')
      .send({ amount: 50000 })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test validation
  it('should return a create transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/debit')
      .send({ amount: '' })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Credit transaction test suite', () => {
  // create transaction test
  it('should create a transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/credit')
      .send({ amount: 5000 })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.transactionType).to.equal('credit');
        done();
      });
  });

  // test validation
  it('should return a create transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257000/credit')
      .send({ amount: '' })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
