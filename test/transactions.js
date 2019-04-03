const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

// Transaction test
describe('Create transaction test suite', () => {
  // create transaction test
  it('should create a transaction', (done) => {
    const values = {
      amount: '5000',
      cashier: '1001',
      type: 'debit',
      balance: '10000',
    };

    chai
      .request(app)
      .post('/api/v1/transactions/617125781/debit')
      .send(values)
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
    const values = {
      cashier: '1001',
      type: 'debit',
      balance: '10000',
    };

    chai
      .request(app)
      .post('/api/v1/transactions/61712578144/debit')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
