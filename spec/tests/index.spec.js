const request = require('supertest');
const app = require('../../server');

describe('API Home test suite', () => {
  it('should return home', () => {
    request(app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe(200);
      })
      .catch(error => console.log(error.message));
  });
});
