const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { goodTransaction, badTransaction } = require('./mockData/transactions');

const { expect } = chai;
chai.use(chaiHttp);

// Transaction test
describe('debit transaction test suite', () => {
  // create transaction test
  it('should create a transaction', (done) => {
    chai
      .request(app)
      .post('/api/v1/transactions/617125781/debit')
      .send(goodTransaction)
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
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
