import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';
import { deleteSkill } from '../controller/skill.js';

chai.use(chaiHttp);

let token;
let idDelete;
const skillID = '6050ad2ff8cf812818f850a6';
const delSkillId = '60538170470d552f44dabcd8';
const menteeID = '605ac0808bab85394cab6a8e';
const mentorID = '60519d0a54327d3e983e4ba7';
const questionID = '606bc34ab1a5090030db1c5b';
const requestID = '605f084eddd6a545245cbee2';
const wrongId = 'a'

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

    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'admin1', password:'123456'});
        expect(result.status).to.equal(200);
        token = await result.body.user.token;
      });

    it('Should return all skill' , function(done){
            chai.request(app).get('/api/admin/skills')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('skill');
                done();
            })
    })

    it('Should return message fail of all skill without Authorization' , function(done){
        chai.request(app).get('/api/admin/skills')
        .end((err,res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return skill with id input', function(done){
            chai.request(app).get(`/api/admin/skills/${skillID}`)
            .set('Authorization', token)
            .end((err,res)=>{
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message fail of skill with id input without Authorization' , function(done){
        chai.request(app).get(`/api/admin/skills/${skillID}`)
        .end((err,res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return massage fail of skill with wrong id input', function(done){
        chai.request(app).get(`/api/admin/skills/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Create new skill', function(done) {
        chai.request(app).post(`/api/admin/skills`)
            .set('Authorization', token)
            .send({name: 'Javalab1'})
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
                idDelete = res.body.data._id;
            })
        
    })

    it('Update skill', function(done){
            chai.request(app).put(`/api/admin/skills/${skillID}`)
            .set('Authorization', token)
            .send({ name: 'Updated skill'})
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message fail of update skill without Authorization' , function(done){
        chai.request(app).put(`/api/admin/skills/${skillID}`)
        .end((err,res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return massage fail of update skill with wrong id input', function(done){
        chai.request(app).put(`/api/admin/skills/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Delete skill', function(done) {
        chai.request(app).delete(`/api/admin/skills/${idDelete}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.status).to.equal(200);
            done();
        })
    })

    it('Should return massage fail of delete skill with wrong id input', function(done){
        chai.request(app).delete(`/api/admin/skills/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Should return message fail of delete skill without Authorization' , function(done){
        chai.request(app).delete(`/api/admin/skills/${skillID}`)
        .end((err,res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('View dashboard', function(done) {
            chai.request(app).get('/api/admin/dashboard')
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

    it('Should return message fail of View dashboard without Authorization', function(done) {
        chai.request(app).get('/api/admin/dashboard')
        .end((err,res) => {
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })     
    })

    //Mentee
    it('View all mentee', function(done) {
        chai.request(app).get('/api/admin/users')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('results');
            done();
        })
    })

    it('View mentee by id', function(done) {
        chai.request(app).get(`/api/admin/users/${menteeID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update mentee by id', function(done){
        chai.request(app).put(`/api/admin/users/${menteeID}`)
        .set('Authorization', token)
        .send({ fullname: 'dat',level: '1'})
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.level).to.equal(1);
            done();
        })
    })

    it('ban mentee by id', function(done){
        chai.request(app).post(`/api/admin/users/${menteeID}`)
        .set('Authorization', token)
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.role).to.equal('banned');
            done();
        })
    })

    it('unban mentee by id', function(done){
        chai.request(app).post(`/api/admin/users/unban/${menteeID}`)
        .set('Authorization', token)
        .end((err,res) => {
            expect(res.status).to.equal(200);
            expect(res.body.data.role).to.equal('mentee');
            done();
        })
    })

    //MENTOR
    it('View all mentor', function(done) {
        chai.request(app).get('/api/admin/mentors')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('results');
            done();
        })
    })

    it('View mentor by id', function(done) {
        chai.request(app).get(`/api/admin/mentors/${mentorID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update mentor by id', function(done){
        chai.request(app).put(`/api/admin/mentors/${mentorID}`)
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
        chai.request(app).get('/api/admin/questions')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('results');
            done();
        })
    })

    it('View questions by id', function(done) {
        chai.request(app).get(`/api/admin/questions/${questionID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })

    it('Update questions by id', function(done){
        chai.request(app).put(`/api/admin/questions/${questionID}`)
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
        chai.request(app).get('/api/admin/requests')
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);

            expect(res.body).to.contain.property('results');
            done();
        })
    })

    it('View requests by id', function(done) {
        chai.request(app).get(`/api/admin/requests/${requestID}`)
        .set('Authorization', token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).is.not.null;
            done();
        })
    })


})

