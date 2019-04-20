import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { goodAccount, goodAccount2, badAccount } from './mockData/accounts';
import { goodLogin } from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;

describe('Create user token', () => {
  it('should signin user', (done) => {
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
});

// Account test
describe('Create account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', userToken)
      .send(goodAccount)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // create account conflict error
  it('should return a create account conflict error', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', userToken)
      .send(goodAccount)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test validation
  it('should return a create account validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', userToken)
      .send(badAccount)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Delete account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', userToken)
      .send(goodAccount2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // delete account test
  it('should delete an account', (done) => {
    chai
      .request(app)
      .delete('/api/v1/accounts/7413162900')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('1 Account successfully deleted');
        done();
      });
  });

  // test if account exists
  it('should return an error if account does not exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/accounts/6171257144')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if invalid parameter is entered as endpoint ID
  it('should return an error if account number is bad', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .delete('/api/v1/accounts/------kkklll')
      .set('authorization', userToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.status).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Activate or deactivate account test suite', () => {
  // change account status test
  it('should activate or deactivate an account', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch('/api/v1/accounts/6171257000')
      .set('authorization', userToken)
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
  it('should return a change status account validation error', (done) => {
    const value = { status: '' };
    chai
      .request(app)
      .patch('/api/v1/accounts/6171257000')
      .set('authorization', userToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if account exists
  it('should return an error if account does not exist', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch('/api/v1/accounts/6171256555')
      .set('authorization', userToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // change account status conflict error
  it('should return a change account status conflict error', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch('/api/v1/accounts/6171257000')
      .set('authorization', userToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
