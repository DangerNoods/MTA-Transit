const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      if (
        ('responds with 200 status and text/html conetnt type',
        () => {
          return request(server)
            .get('/')
            .expect('Conetent-Type', /text\/html/)
            .expect(200);
        })
      );
    });
  });
});
