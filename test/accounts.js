import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { goodAccount, goodAccount2, badAccount } from './mockData/accounts';
import { clientLogin, staffLogin, adminLogin } from './mockData/user';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let adminToken;
let accountnumber;
let accountnumber2;

describe('Create user token', () => {
  // Login client test
  it('should signin client', (done) => {
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

  // Login staff test
  it('should signin staff', (done) => {
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

  // Login admin test
  it('should signin admin', (done) => {
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

// Account test
describe('Create account test suite', () => {
  // create account test
  it('should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', clientToken)
      .send(goodAccount)
      .end((err, res) => {
        accountnumber = res.body.data.accountNumber;
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // test validation
  it('should return a create account validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('authorization', clientToken)
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
      .set('authorization', clientToken)
      .send(goodAccount2)
      .end((err, res) => {
        accountnumber2 = res.body.data.accountNumber;
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  // delete account error test
  it('should return a delete account error', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/accounts/${accountnumber2}`)
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // delete account test
  it('should delete an account', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/accounts/${accountnumber2}`)
      .set('authorization', staffToken)
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
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if invalid parameter is entered as endpoint ID
  // it('should return an error if account number is bad', (done) => {
  //   chai
  //     .request(app)
  //     .delete('/api/v1/accounts/------kkklll')
  //     .set('authorization', staffToken)
  //     .end((err, res) => {
  //       console.log('+++++++++==========>', res.body, err);
  //       expect(res.status).to.equal(500);
  //       expect(res.body.status).to.equal(500);
  //       expect(res.body).to.have.property('error');
  //       done();
  //     });
  // });
});

describe('Activate or deactivate account test suite', () => {
  // staff change account status test
  it('should activate or deactivate an account', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', adminToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('status');
        done();
      });
  });

  // client change account status test
  it('should return an activate or deactivate an account error', (done) => {
    const value = { status: 'active' };
    chai
      .request(app)
      .patch(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', clientToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test validation
  it('should return a change status account validation error', (done) => {
    const value = { status: '' };
    chai
      .request(app)
      .patch(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', adminToken)
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
      .set('authorization', adminToken)
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
      .patch(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', adminToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET specific account', () => {
  // get specific account test
  it('should return details of a specific account', (done) => {
    chai
      .request(app)
      .get(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('status');
        done();
      });
  });

  // test for wrong account number
  it('should return an error for wrong account number', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/6171257141')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET all accounts', () => {
  // get all accounts test as staff
  it('should return all accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // get all accounts test as client
  it('should return a user type error', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET all accounts with status of active', () => {
  // get all accounts test as staff
  it('should return all accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=active')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // get all accounts test as client
  it('should return all accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=active')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if no account with requested status
  it('should return all accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=dormant')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('GET all accounts with status of dormant', () => {
  // change account status
  it('should activate or deactivate an account', (done) => {
    const value = { status: 'dormant' };
    chai
      .request(app)
      .patch(`/api/v1/accounts/${accountnumber}`)
      .set('authorization', adminToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('status');
        done();
      });
  });

  // get all accounts test as staff
  it('should return all dormant accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=dormant')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  // get all accounts test as client
  it('should return an authentication error', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=dormant')
      .set('authorization', clientToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if no account with requested status
  it('should return all accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts?status=active')
      .set('authorization', staffToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
