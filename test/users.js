const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { goodSignup, badSignup, goodLogin, badLogin, invalidLogin } = require('./mockData/user');

const { expect } = chai;
chai.use(chaiHttp);

// User sign up test
describe('User signup test suite', () => {
  // test user sign up
  it('should return User signup object', (done) => {
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

  // test validation
  it('should return a user signup error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup)
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
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(goodLogin)
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
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(badLogin)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if user doesn't exist
  it('should return a User auth error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(invalidLogin)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
