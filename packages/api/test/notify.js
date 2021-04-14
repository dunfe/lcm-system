import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);
let token;
let notifyIdformentee = '6076a70a13460604b0cb95be'
let notifyIdformentor = '6076a70a13460604b0cb95be'
let wrongId = 'a'

describe(' Notify of mentee', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });

    it('Should return status success of list notify', function(done){
        chai.request(app).get(`/api/users/notify`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of list notify', function(done){
        chai.request(app).get(`/api/users/notify`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of list notify without Authorization', function(done){
        chai.request(app).get(`/api/users/notify`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of list notify without Authorization', function(done){
        chai.request(app).get(`/api/users/notify`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status success of click notify', function(done){
        chai.request(app).put(`/api/users/notify/${notifyIdformentee}`)
            .set('Authorization', token)
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return room id after of click notify', function(done){
        chai.request(app).put(`/api/users/notify/${notifyIdformentee}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('roomid');
            done();
        })
    })

    it('Should return status fail of question after mentor selected with wrong id', function(done) {
        chai.request(app).put(`/api/users/notify/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of question after mentor selected with wrong id', function(done) {
        chai.request(app).put(`/api/users/notify/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })
})

describe(' notify of mentor', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'user1', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });

      it('Should return status success of list notify', function(done){
        chai.request(app).get(`/api/users/notify`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of list notify', function(done){
        chai.request(app).get(`/api/users/notify`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of list notify without Authorization', function(done){
        chai.request(app).get(`/api/users/notify`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of list notify without Authorization', function(done){
        chai.request(app).get(`/api/users/notify`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })
})
