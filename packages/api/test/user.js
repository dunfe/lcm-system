import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);
let token;
before(async () => {
    const result = await chai
      .request(app)
      .post('/api/users/login')
      .send({ username: 'mentee', password:'123456'});
    expect(result.status).to.equal(200);
    token = result.body.user.token;
  });

describe('User login successful', () => {
    
    it('Ok, login thanh cong', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'mentee1', password:'123456' })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('user');
            expect(res).to.have.status(200);
            done()
        })
        .catch((err) => done(err))
    })

    it('tra ve token', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'mentee1' , password: '123456'})
        .then((res) => {
            const body = res.body.user;
            expect(body).to.contain.property('token');
            done();
        })
        .catch((err) => done(err))
    })

    it('tra ve token', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'mentee1' , password: '123456'})
        .then((res) => {
            const body = res.body.user;
            const token = res.body.user.token;
            expect(body).to.contain.property('token');
            expect(token).to.contain('Bearer');
            done();
        })
        .catch((err) => done(err))
    })
})

describe('User crud question', () =>{
    it('should return list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('skill');
                done();
            })
    })
})
