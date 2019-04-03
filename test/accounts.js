const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

// Account test
describe('Account test suite', () => {
  // create account test
  describe('Create Account suite', () => {
    it('should create an account', (done) => {
      const values = {
        email: 'fluxie@gmail.com',
        firstName: 'flux',
        lastName: 'mel',
        accountNumber: 6171257181,
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
  });

  // test validation
  it('should return a create account error', (done) => {
    const values = {
      email: 'fluxiegmail.com',
      firstName: 'flux',
      lastName: 'mel',
      accountNumber: 6171257181,
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
