const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

// User sign up test
describe('User signup test suite', () => {
  // test user sign up
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

  // test validation
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

// User Login Tests
describe('User login test suite', () => {
  // test login
  it('should return User login object', (done) => {
    const values = {
      email: 'dummy@mail.com',
      password: 'zigblayu',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a User login error', (done) => {
    const values = {
      email: 'fluxiegmail.com',
      password: 'monkeyman',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if user doesn't exist
  it('should return a User auth error', (done) => {
    const values = {
      email: 'flu@gmail.com',
      password: 'monkeyman',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
