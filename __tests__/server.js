const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
  describe('/subway', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json conetnt type', () => {
        return request(server)
          .get('/subway')
          .expect('Content-Type', /json/)
          .expect(200);
      });
      it('subway alerts data array is in body of response', () => {
        return request(server)
          .get('/subway')
          .then((data) => {
            expect(Array.isArray(data.body)).toBe(true);
          });
      });
      it('subway alerts data array has length of 20', () => {
        return request(server)
          .get('/subway')
          .then((data) => {
            expect(data.body.length).toBe(20);
          });
      });
    });
  });
  describe('/accessibility', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json conetnt type', () => {
        return request(server)
          .get('/accessibility')
          .expect('Content-Type', /json/)
          .expect(200);
      });
      it('accessibility information array is in body of response', () => {
        return request(server)
          .get('/accessibility')
          .then((data) => {
            expect(Array.isArray(data.body)).toBe(true);
          });
      });
    });
  });
});
