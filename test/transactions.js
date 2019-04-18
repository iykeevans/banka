import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { goodSignup } from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

describe('Create user token', () => {
  it('should sign up user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(goodSignup)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  it('should signin user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'fluxie97@yahoo.com',
        password: 'hintherland',
      })
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
      .post('/api/v1/transactions/6171257181/debit')
      .send({ amount: 5000 })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a create transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257181/debit')
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
      .post('/api/v1/transactions/6171257181/credit')
      .send({ amount: 5000 })
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a create transaction error', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/6171257181/credit')
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
