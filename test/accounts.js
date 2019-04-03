const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

// Account test
describe('Create account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    const values = {
      email: 'fluxie@gmail.com',
      firstName: 'flux',
      lastName: 'mel',
      accountNumber: 6171257000,
      type: 'savings',
    };

    chai
      .request(app)
      .post('/api/v1/accounts')
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
  it('should return a create account error', (done) => {
    const values = {
      email: 'fluxiegmail.com',
      firstName: 'flux',
      lastName: 'mel',
      accountNumber: 6171257000,
      type: 'savings',
    };

    chai
      .request(app)
      .post('/api/v1/accounts')
      .send(values)
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
