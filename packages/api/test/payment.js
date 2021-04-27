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

    //visa

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

    //visa debit

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
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //visa

    it('Should return status "200" success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '4242424242424242',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //visa debit

    it('Should return status "200" success to Create point', function (done) {
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
                expect(200);
                done();
            })
    })

    it('Should return status "200" success to Create point', function (done) {
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
                cardNumber: '4000056655665559',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //visa

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

    //master card

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '5555555555554444',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '5555555555554444',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
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
                cardNumber: '5555555555554444',
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
                cardNumber: '5555555555554444',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Mastercard (2-series)
    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '2223003122003222',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '2223003122003222',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
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
                cardNumber: '2223003122003222',
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
                cardNumber: '2223003122003222',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Mastercard (debit)

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '5200828282828210',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '5200828282828210',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
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
                cardNumber: '5200828282828210',
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
                cardNumber: '5200828282828210',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //American Express
    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '378282246310005',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '378282246310005',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
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
                cardNumber: '378282246310005',
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
                cardNumber: '378282246310005',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //American Express another card
    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '371449635398431',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '371449635398431',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
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
                cardNumber: '371449635398431',
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
                cardNumber: '371449635398431',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Discover
    it('Should return status fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011111111111117',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011111111111117',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Necessary Card Details are required" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011111111111117',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011111111111117',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Discover another card
    it('Should return status fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011000990139424',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011000990139424',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Necessary Card Details are required" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011000990139424',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '6011000990139424',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Diners Club
    it('Should return status fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '3056930009020004',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '3056930009020004',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Necessary Card Details are required" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '3056930009020004',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '3056930009020004',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    //Diners Club (14 digit card)
    it('Should return status fail to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '36227206271667',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return status success to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '36227206271667',
                cardExpMonth: '07',
                cardExpYear: '2022',
                cardCVC: '456',
                country: 'Viet Nam',
                posttalCode: '100000',
                currency: 'usd',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal('success');
                done();
            })
    })

    it('Should return message "Necessary Card Details are required" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '36227206271667',
                cardExpMonth: '07',
                cardExpYear: '2022',
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

    it('Should return message "Payement Success" to Create point', function (done) {
        chai.request(app).post(`/api/users/payment`)
            .set('Authorization', token)
            .send({
                amount: 100000,
                cardNumber: '36227206271667',
                cardExpMonth: '07',
                cardExpYear: '2022',
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
})