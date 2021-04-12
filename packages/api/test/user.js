import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);
let token;
let questionId = '605b2cff4ba7106618f7d14e';

describe('User login successful', () => {
    
    it('Ok, login thanh cong', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'mentee', password:'123456' })
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
        .send({ username: 'mentee' , password: '123456'})
        .then((res) => {
            const body = res.body.user;
            expect(body).to.contain.property('token');
            done();
        })
        .catch((err) => done(err))
    })

    it('tra ve token', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'mentee' , password: '123456'})
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

describe('mentee crud question', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });

    it('should return list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('should return list new and doing question ', (done) => {
        chai.request(app).get('/api/users/questions/new')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('should return list done question ', (done) => {
        chai.request(app).get('/api/users/questions/done')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return question with id input', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Create new question', function(done) {
        chai.request(app).post(`/api/users/questions`)
            .set('Authorization', token)
            .send({
                title: 'About funtion Nodejs',
                point: 200,
                skill: 'java',
                timeAvailableFrom: 1617693860,
                timeAvailableTo: 1617694860,
                content: 'How to use express',
                status: 'new',
                note: '',
            })
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('data');
                done();
        })
    })

    it('Update question', function(done){
        chai.request(app).put(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .send({ point: 200})
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    // it('Delete question', function(done) {
    //     chai.request(app).put(`/api/users/questions/${questionId}`)
    //     .set('Authorization', token)
    //     .end((err,res)=>{
    //         expect(res.status).to.equal(200);
    //         done();
    //     })
    // })
})
