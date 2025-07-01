const request = require('supertest');
const app = require('../src/app');
// Test unitarios
test('GET / should return Hello World!', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('Hello World!');
});

test('GET /sum should return correct result', async () => {
  const res = await request(app).get('/sum?a=5&b=3');
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(8);
});

test('GET /sum without parameters should return 400', async () => {
  const res = await request(app).get('/sum');
  expect(res.statusCode).toBe(400);
});

test('GET /subtract should return correct result', async () => {
  const res = await request(app).get('/subtract?a=10&b=4');
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(6);
});

test('GET /subtract without parameters should return 400', async () => {
  const res = await request(app).get('/subtract');
  expect(res.statusCode).toBe(400);
});
// Test de integración
test('Integration: sum then subtract', async () => {
  const sumRes = await request(app).get('/sum?a=10&b=5');
  expect(sumRes.statusCode).toBe(200);
  const suma = sumRes.body.result;

  const subRes = await request(app).get(`/subtract?a=${suma}&b=3`);
  expect(subRes.statusCode).toBe(200);
  expect(subRes.body.result).toBe(12);
});

test('Integration: error when missing query parameters', async () => {
  const res1 = await request(app).get('/sum?a=5');
  const res2 = await request(app).get('/subtract');

  expect(res1.statusCode).toBe(400);
  expect(res2.statusCode).toBe(400);
});