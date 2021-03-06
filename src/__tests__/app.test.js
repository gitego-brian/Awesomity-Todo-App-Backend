import chai from 'chai';
import {
  describe, it,
} from 'mocha';
import supertest from 'supertest';
import app from '..';
import env from '../config/env';

const { expect } = chai;
const request = supertest(app);

describe('App tests', () => {
  it('should display a welcome message', async () => {
    const res = await request.get('/');
    expect(res.status).to.eql(200);
  });
  it('should display a not found message', async () => {
    const res = await request.get('/api/foo');
    expect(res.status).to.eql(404);
  });
  it('should display an unauthorized message', async () => {
    const res = await request.get('/api/logs/foo');
    expect(res.status).to.eql(403);
  });
  it('should download logs', async () => {
    const res = await request.get(`/api/logs/${env.APP_ADMIN_SECRET}`);
    expect(res.status).to.eql(200);
  });
});
