import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';
import { deleteSkill } from '../controller/skill.js';

chai.use(chaiHttp);

let token;
const skillID = '6050ad2ff8cf812818f850a6';
const delSkillId = '60538170470d552f44dabcd8';
const menteeID = '6050c70e44519f63b897cd44';
const mentorID = '6050b3337a2015252ca6e8a0';
const questionID = '6050b0337cce0614e0b1ed50';
const requestID = '6050af8f8597794014c2b740';

before(async () => {
    const result = await chai
      .request(app)
      .post('/api/users/login')
      .send({ username: 'admin1', password:'123456'});
    expect(result.status).to.equal(200);
    token = result.body.user.token;
  });

describe('Admin login successful',  () => {
    
    it('Should return admin role', function (done) {
            chai.request(app).post('/api/users/login')
            .send({ username: 'admin1', password:'123456'})
            .end((err,res) =>{
                expect(res.status).to.equal(200);
                expect(res.body.user.data.role).to.equal('admin');
                done();
            })            
    })
})

describe('Check Admin API', () => {
    it('Should return all skill' , function(done){
            chai.request(app).get('/admin/skills')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('skill');
                done();
            })
    })

    it('Should return skill with id input', function(done){
            chai.request(app).get(`/admin/skills/${skillID}`)
            .set('Authorization', token)
            .end((err,res)=>{
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Create new skill', function(done) {
            chai.request(app).post(`/admin/skills`)
            .set('Authorization', token)
            .send({name: 'New Java'})
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })

            
    })

    it('Update skill', function(done){
            chai.request(app).put(`/admin/skills/${skillID}`)
            .set('Authorization', token)
            .send({ name: 'Updated skill'})
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Delete skill', function(done) {
        chai.request(app).put(`/admin/skills/${delSkillId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.status).to.equal(200);
            done();
        })
    })

    it('View dashboard', function(done) {
            chai.request(app).get('/admin/dashboard')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.contain.property('totalUser');
                expect(res.body).to.contain.property('totalMentor');
                expect(res.body).to.contain.property('totalQuestion');
                expect(res.body).to.contain.property('totalSkill');
                done();
            })     
    })

    it('View all mentee', function(done) {
        chai.request(app).get('/admin/users')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('View mentee by id', function(done) {
        chai.request(app).get(`/admin/users/${menteeID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update mentee by id', function(done){
        chai.request(app).put(`/admin/users/${menteeID}`)
        .set('Authorization', token)
        .send({ level: '1'})
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.level).to.equal(1);
            done();
        })
    })

    //MENTOR
    it('View all mentor', function(done) {
        chai.request(app).get('/admin/mentors')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('View mentor by id', function(done) {
        chai.request(app).get(`/admin/mentors/${mentorID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update mentor by id', function(done){
        chai.request(app).put(`/admin/mentors/${mentorID}`)
        .set('Authorization', token)
        .send({ level: '1'})
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.level).to.equal(1);
            done();
        })
    })

    //QUESTION

    it('View all question', function(done) {
        chai.request(app).get('/admin/questions')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('View questions by id', function(done) {
        chai.request(app).get(`/admin/questions/${questionID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update questions by id', function(done){
        chai.request(app).put(`/admin/questions/${questionID}`)
        .set('Authorization', token)
        .send({ point: '100'})
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.point).to.equal(100);
            done();
        })
    })

    //REQUESTS
    it('View all requests', function(done) {
        chai.request(app).get('/admin/requests')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('View requests by id', function(done) {
        chai.request(app).get(`/admin/requests/${requestID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

})
