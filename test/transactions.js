const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { goodTransaction, badTransaction } = require('./mockData/transactions');
const { goodLogin } = require('./mockData/user');

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

before('Create user token', (done) => {
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

// Transaction test
describe('debit transaction test suite', () => {
  // create transaction test
  it('should create a transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/617125781/debit')
      .send(goodTransaction)
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
      .post('/api/v1/transactions/61712578144/debit')
      .send(badTransaction)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
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
      .post('/api/v1/transactions/617125781/credit')
      .send(goodTransaction)
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
      .post('/api/v1/transactions/61712578144/credit')
      .send(badTransaction)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
