import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import './users';
import './accounts';
import './transactions';

const { expect } = chai;
chai.use(chaiHttp);

describe('API Home test suite', () => {
  it('should return Welcome to my Banka app', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to my Banka app');
        done();
      });
  });

  it('should return Welcome to my Banka API', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to my Banka API');
        done();
      });
  });
});
