const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('User test suite', () => {
  it('should return User signup object', (done) => {
    const values = {
      email: 'fluxie@gmail.com',
      firstName: 'flux',
      lastName: 'mel',
      password: 'monkeyman',
      type: 'savings',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  it('should return a user signup error', (done) => {
    const values = {
      email: 'fluxiegmail.com',
      firstName: 'flux',
      lastName: 'mel',
      password: 'monkeyman',
      type: 'savings',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
