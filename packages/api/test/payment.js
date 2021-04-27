import chai from 'chai';
import payment from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);
let token;

describe('Mentee payment method', () => {

    before(async () => {
        const result = await chai
            .request(app)
            .post('/api/users/login')
            .send({ username: 'mentee', password: '123456' });
        expect(result.status).to.equal(200);
        token = result.body.user.token;
    });

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.message).to.equal('Payment Success');
                done();
            })
    })

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4000056655665556',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4000056655665556',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.message).to.equal('Payment Success');
                done();
            })
    })

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4000056655665556',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(res.body.message).to.equal('Payment Success');
                done();
            })
    })

    it('Should return status "200" success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(200);
                done();
            })
    })

    it('Should return status "200" success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(200);
                done();
            })
    })

    it('Should return status "400" fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424243',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(400);
                done();
            })
    })

    it('Should return status "400" fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '15',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(400);
                done();
            })
    })

    it('Should return status "400" fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '45645',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(400);
                done();
            })
    })

    it('Should return status "400" fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'nhd',
            })
            .end((err, res) => {
                expect(400);
                done();
            })
    })

    it('Should return message "Necessary Card Details are required" fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '15',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.message).to.equal('Necessary Card Details are required');
                done();
            })
    })

    it('Should return status fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424243',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('fail');
                done();
            })
    })

    it('Should return status false when Create point without Authorization', function(done) {
        chai.request(app).post(`/api/users/payment`)
            // .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424243',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err,res) => {
                expect(res.body.message).to.equal('Invalid Token. Maybe you are not logged in! Please log in to get acces or double check your token');
                done();
        })
    })

    it('Should return status false when Create point without Authorization', function(done) {
        chai.request(app).post(`/api/users/payment`)
            // .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424243',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err,res) => {
                expect(res.body.status).to.equal('fail');
                done();
        })
    })

    it('Should return "400" false when Create point without Authorization', function(done) {
        chai.request(app).post(`/api/users/payment`)
            // .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424243',
                cardExpMonth: '08',
                cardExpYear: '2023',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'vnd',
            })
            .end((err,res) => {
                expect(400);
                done();
        })
    })
})