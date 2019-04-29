import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import {
  clientSignup,
  clientLogin,
  staffSignup,
  staffLogin,
  adminSignup,
  badAdminSignup,
  badSignup,
  badLogin,
  invalidLogin,
  invalidLogin2,
  adminLogin,
} from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let adminToken;

// Admin login test
describe('should login admin', () => {
  it('should login admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(adminLogin)
      .end((err, res) => {
        adminToken = `Bearer ${res.body.data.token}`;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
});

// User sign up test
describe('User signup test suite', () => {
  // test user (client) sign up
  it('should signup a client successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(clientSignup)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test user (staff) sign up
  it('should signup a staff successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .set('authorization', adminToken)
      .send(staffSignup)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test user (admin) sign up
  it('should signup an admin successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .set('authorization', adminToken)
      .send(adminSignup)
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
  it('should return a user validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(badSignup)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test for user type error
  it('should return a user type error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(badAdminSignup)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if email already exists
  it('should return a user conflict error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(clientSignup)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

// User Login Tests
describe('User login test suite', () => {
  // test login for client
  it('should login client successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(clientLogin)
      .end((err, res) => {
        clientToken = `Bearer ${res.body.data.token}`;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test login for staff
  it('should login staff successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(staffLogin)
      .end((err, res) => {
        staffToken = `Bearer ${res.body.data.token}`;
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a User validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(badLogin)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
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
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if user exists but wrong password
  it('should return a User auth error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(invalidLogin2)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET all user accounts', () => {
  // test for getting all accounts
  it('should return all user accounts', (done) => {
    chai
      .request(app)
      .get(`/api/v1/user/${clientLogin.email}/accounts`)
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // test for email that doesn't exist
  it('should return a user accounts error', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/--------lllkkkkk/accounts')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test for viewing as client
  it('should return a user accounts error', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/--------lllkkkkk/accounts')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
