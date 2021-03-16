import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const expect = chai.expect;

import app from '../app.js';

function login()  {
        console.log('Connecting to a mock db for testing purposes.');
        const mongoServer = new MongoMemoryServer();
        mongoose.Promise = Promise;
        mongoServer.getUri()
            .then((mongoUri) => {
                const mongooseOpts = {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                };
      
                mongoose.connect(mongoUri, mongooseOpts);
      
                mongoose.connection.on('error', (e) => {
                    if (e.message.code === 'ETIMEDOUT') {
                        console.log(e);
                        mongoose.connect(mongoUri, mongooseOpts);
                    }
                    console.log(e);
                });
      
                mongoose.connection.once('open', () => {
                    console.log(`MongoDB successfully connected to ${mongoUri}`);
                });
            });
      
}

describe('Login', () => {
    before((done) => {
        login();
        done();
    })

    it('Ok, login thanh cong', (done) => {
        request(app).post('/api/users/login')
        .send({ username: 'user123', password:'user123' })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('user');
            done()
        })
        .catch((err) => done(err))
    })
})