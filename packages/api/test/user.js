import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);
let token;
let questionId = '605b2cff4ba7106618f7d14e';
let mentorId = '60607790df75cf564cb83fd7'
let wrongId = 'a'
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

    it('should return status of list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return message fail of list question without Authorization', function(done){
        chai.request(app).get('/api/users/questions')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status fail of list question without Authorization', function(done){
        chai.request(app).get('/api/users/questions')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('should return status of list new and doing question ', (done) => {
        chai.request(app).get('/api/users/questions/new')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list new and doing question ', (done) => {
        chai.request(app).get('/api/users/questions/new')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return message fail of list new and doing question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/new')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status fail of list new and doing question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/new')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('should return status of list done question ', (done) => {
        chai.request(app).get('/api/users/questions/done')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list done question ', (done) => {
        chai.request(app).get('/api/users/questions/done')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return message fail of list done question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/done')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status fail of list done question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/done')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return status of question with id input', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of question with id input', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of question with wrong id input', function(done){
        chai.request(app).get(`/api/users/questions/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })
    
    it('Should return massage fail of question with wrong id input', function(done){
        chai.request(app).get(`/api/users/questions/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Should return message fail of question without Authorization', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status fail of question without Authorization', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
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

    it('should return status false when Create question without Authorization', function(done) {
        chai.request(app).post(`/api/users/questions`)
            // .set('Authorization', token)
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
                expect(res.body.status).to.equal('fail');
                done();
        })
    })

    it('should return message false when Create question without Authorization', function(done) {
        chai.request(app).post(`/api/users/questions`)
            // .set('Authorization', token)
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
                expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
                done();
        })
    })

    it('Should return status success of Update question', function(done){
        chai.request(app).put(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .send({ point: 200})
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return data of question after Update question', function(done){
        chai.request(app).put(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .send({ point: 200})
            .end((err,res)=> {
                expect(res.body).to.contain.property('data');
                done();
        })
    })

    it('Should return status fail of update question without Authorization', function(done){
        chai.request(app).put(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return message fail of update question without Authorization', function(done){
        chai.request(app).put(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
                expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })
    
    it('Should return status fail of update question with wrong id', function(done) {
        chai.request(app).put(`/api/users/questions/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of update question with wrong id', function(done) {
        chai.request(app).put(`/api/users/questions/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
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

    it('Should return status fail of Delete question without Authorization', function(done) {
        chai.request(app).put(`/api/users/questions/${questionId}`)
        //.set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of Delete question without Authorization', function(done) {
        chai.request(app).put(`/api/users/questions/${questionId}`)
        //.set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status fail of Delete question with wrong id', function(done) {
        chai.request(app).put(`/api/users/questions/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of Delete question with wrong id', function(done) {
        chai.request(app).put(`/api/users/questions/${wrongId}`)
        .set('Authorization', token)
        .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })
})

describe('About favourite mentor of mentee', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });

    it('add favourite mentor', function(done){
        chai.request(app).put(`/api/users/favorite-mentor/${mentorId}`)
            .set('Authorization', token)
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return massage fail of add favourite with wrong id input', function(done){
        chai.request(app).put(`/api/users/favorite-mentor/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Should return status fail of add favourite with wrong id input', function(done){
        chai.request(app).put(`/api/users/favorite-mentor/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return status fail of add favourite without Authorization', function(done){
        chai.request(app).put(`/api/users/favorite-mentor/${mentorId}`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of add favourite without Authorization', function(done){
        chai.request(app).put(`/api/users/favorite-mentor/${mentorId}`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status success of list mentor favourite', function(done){
        chai.request(app).get(`/api/users/favorite-mentor`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of list mentor favourite', function(done){
        chai.request(app).get(`/api/users/favorite-mentor`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of add favourite without Authorization', function(done){
        chai.request(app).get(`/api/users/favorite-mentor`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of add favourite without Authorization', function(done){
        chai.request(app).get(`/api/users/favorite-mentor`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status success of list mentor favourite', function(done){
        chai.request(app).get(`/api/users/favorite-mentor/count`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return count of list mentor favourite', function(done){
        chai.request(app).get(`/api/users/favorite-mentor/count`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('count');
            done();
        })
    })

    it('Should return status fail of count list favourite without Authorization', function(done){
        chai.request(app).get(`/api/users/favorite-mentor/count`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of count list favourite without Authorization', function(done){
        chai.request(app).get(`/api/users/favorite-mentor/count`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })
})


describe('register mentor', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
    });

    it('Should return status successful of Create request register mentor', function(done) {
        chai.request(app).post(`/api/users/mentor/register`)
            .set('Authorization', token)
            .send({
                title: 'About funtion Nodejs',
                receivedBy: 'staff',
                content: 'aaa',
                skill: 'java',
                bio: 'aaaa',
                github: 'github.com/aaa',
                currentJob: 'dev java of fpt',
                achievement: '3 năm kinh nghiệm',
            })
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return data after Create request register mentor', function(done) {
        chai.request(app).post(`/api/users/mentor/register`)
            .set('Authorization', token)
            .send({
                title: 'About funtion Nodejs',
                receivedBy: 'staff',
                content: 'aaa',
                skill: 'java',
                bio: 'aaaa',
                github: 'github.com/aaa',
                currentJob: 'dev java of fpt',
                achievement: '3 năm kinh nghiệm',
            })
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
        })
    })

    it('Should return status fail of Create request register mentor without Authorization', function(done){
        chai.request(app).post(`/api/users/mentor/register`)
            .send({
                title: 'About funtion Nodejs',
                receivedBy: 'staff',
                content: 'aaa',
                skill: 'java',
                bio: 'aaaa',
                github: 'github.com/aaa',
                currentJob: 'dev java of fpt',
                achievement: '3 năm kinh nghiệm',
            })
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of Create request register mentor without Authorization', function(done){
        chai.request(app).post(`/api/users/mentor/register`)
            .send({
                title: 'About funtion Nodejs',
                receivedBy: 'staff',
                content: 'aaa',
                skill: 'java',
                bio: 'aaaa',
                github: 'github.com/aaa',
                currentJob: 'dev java of fpt',
                achievement: '3 năm kinh nghiệm',
            })
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })
})

describe('mentor crud question', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'user1', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });

    it('should return status success of list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list question', (done) => {
        chai.request(app).get('/api/users/questions')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return status fail of list question without Authorization', function(done){
        chai.request(app).get('/api/users/questions')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of list question without Authorization', function(done){
        chai.request(app).get('/api/users/questions')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('should return status success of list new and doing question ', (done) => {
        chai.request(app).get('/api/users/questions/new')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list new and doing question', (done) => {
        chai.request(app).get('/api/users/questions/new')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return status fail of list new and doing question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/new')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of list new and doing question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/new')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('should return status success of list done question ', (done) => {
        chai.request(app).get('/api/users/questions/done')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('should return data of list done question', (done) => {
        chai.request(app).get('/api/users/questions/done')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
            })
    })

    it('Should return status fail of list done question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/done')
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of list done question without Authorization', function(done){
        chai.request(app).get('/api/users/questions/done')
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status success question with id input', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of question with id input', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of question with id input without Authorization', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of question with id input without Authorization', function(done){
        chai.request(app).get(`/api/users/questions/${questionId}`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return massage fail of question with wrong id input', function(done){
        chai.request(app).get(`/api/users/questions/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Should return status fail of question with wrong id input', function(done){
        chai.request(app).get(`/api/users/questions/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })
})

describe('rate mentor', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });
    
    it('Should return status success after rate mentor', function(done) {
        chai.request(app).post(`/api/users/mentor/rate/${mentorId}`)
            .set('Authorization', token)
            .send({
                star: 5,
                content: 'aaa',
            })
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return data request after rate mentor', function(done) {
        chai.request(app).post(`/api/users/mentor/rate/${mentorId}`)
            .set('Authorization', token)
            .send({
                star: 5,
                content: 'aaa',
            })
            .end((err,res) => {
                expect(res.body).to.contain.property('data');
                done();
        })
    })

    it('Should return status fail of rate mentor without Authorization', function(done){
        chai.request(app).post(`/api/users/mentor/rate/${mentorId}`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of rate mentor without Authorization', function(done){
        chai.request(app).post(`/api/users/mentor/rate/${mentorId}`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return massage fail of rate mentor with wrong id mentor input', function(done){
        chai.request(app).post(`/api/users/mentor/rate/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid id '+ `${wrongId}`);
            done();
        })
    })

    it('Should return status fail of rate mentor with wrong id mentor input', function(done){
        chai.request(app).post(`/api/users/mentor/rate/${wrongId}`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })
})

describe('view and edit mentee info', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentee', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });
    
    it('Should return status success mentee info ', function(done){
        chai.request(app).get(`/api/users/`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('Should return data of mentee info ', function(done){
        chai.request(app).get(`/api/users/`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of mentee info without Authorization', function(done){
        chai.request(app).get(`/api/users/`)
            .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of mentee info without Authorization', function(done){
        chai.request(app).get(`/api/users/`)
            .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })

    it('Should return status success of edit profile', function(done){
        chai.request(app).put(`/api/users/`)
            .set('Authorization', token)
            .send({
                avatar: '',
                phone: '123456789',
                gender: 'Male',
                address: 'Ha Noi',
                currentJob: 'Student '
            })
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })

    it('Should return data after edit profile ', function(done){
        chai.request(app).put(`/api/users/`)
            .set('Authorization', token)
            .send({
                avatar: '',
                phone: '123456789',
                gender: 'Male',
                address: 'Ha Noi',
                currentJob: 'Student '
            })
            .end((err,res)=>{
            expect(res.body).to.contain.property('data');
            done();
        })
    })

    it('Should return status fail of edit profile without Authorization', function(done){
        chai.request(app).put(`/api/users/`)
        .send({
            avatar: '',
            phone: '123456789',
            gender: 'Male',
            address: 'Ha Noi',
            currentJob: 'Student '
        })
        .end((err,res)=>{
            expect(res.body.status).to.equal('fail');
            done();
        })
    })

    it('Should return massage fail of edit profile without Authorization', function(done){
        chai.request(app).put(`/api/users/`)
        .send({
            avatar: '',
            phone: '123456789',
            gender: 'Male',
            address: 'Ha Noi',
            currentJob: 'Student '
        })
        .end((err,res)=>{
            expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
            done();
        })
    })
})

describe('view and edit mentor info', () =>{
    before(async () => {
        const result = await chai
          .request(app)
          .post('/api/users/login')
          .send({ username: 'mentor', password:'123456'});
        expect(result.status).to.equal(200);
        token = result.body.user.token;
      });
    
    it('Should return mentee info ', function(done){
        chai.request(app).get(`/api/users/`)
            .set('Authorization', token)
            .end((err,res)=>{
            expect(res.body.status).to.equal('success');
            done();
        })
    })

    it('edit profile', function(done){
        chai.request(app).put(`/api/users/`)
            .set('Authorization', token)
            .send({
                avatar: '',
                phone: '123456789',
                gender: 'Male',
                address: 'Ha Noi',
                currentJob: 'Student ',
                achievement: '3 năm kinh nghiệm',
                skill: 'java',
                bio: 'hello world',
                github: 'github.com/datlt'
            })
            .end((err,res)=> {
                expect(res.body.status).to.equal('success');
                done();
        })
    })
})

describe(' get all list skill', () =>{

    it('should return list skill', (done) => {
        chai.request(app).get('/api/users/skills')
            .set('Authorization', token)
            .end((err,res) => {
                expect(res.body.status).to.equal('success');
                expect(res.body).to.contain.property('skill');
                done();
            })
    })
})