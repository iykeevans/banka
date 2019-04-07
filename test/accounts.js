const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { goodAccount, badAccount } = require('./mockData/accounts');

const { expect } = chai;
chai.use(chaiHttp);

// Account test
describe('Create account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .send(goodAccount)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a create account error', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .send(badAccount)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Delete account test suite', () => {
  // delete account test
  it('should delete an account', (done) => {
    chai
      .request(app)
      .delete('/api/v1/accounts/6171257000')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Account successfully deleted');
        done();
      });
  });

  // test validation
  it('should return a delete account error', (done) => {
    chai
      .request(app)
      .delete('/api/v1/accounts/6171257144')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Activate or deactivate account test suite', () => {
  // delete account test
  it('should activate or deactivate an account', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch('/api/v1/accounts/6171257181')
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('status');
        done();
      });
  });

  // test validation
  it('should return a delete account error', (done) => {
    chai
      .request(app)
      .patch('/api/v1/accounts/6171257555')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
