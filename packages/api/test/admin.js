import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
const expect = chai.expect;

import app from '../app.js';

chai.use(chaiHttp);

let token;
const skillID = '6050ad2ff8cf812818f850a6';

before(async () => {
    const result = await chai
      .request(app)
      .post('/api/users/login')
      .send({ username: 'admin1', password:'123456'});
    expect(result.status).to.equal(200);
    token = result.body.user.token;
  });

describe('Admin login successful',  () => {
    
    it('Should return admin role',async() => {
        try {
        const result = await chai
            .request(app)
            .post('/api/users/login')
            .send({ username: 'admin1', password:'123456'});

            expect(result.status).to.equal(200);
            expect(result.body.user.data.role).to.equal('admin');
        } catch (error) {
            console.log(error);
        }
    })
})

describe('Skill CRUD', () => {
    it('Should return all skill' , async() => {
        try {
            const result = await chai
            .request(app)
            .get('/admin/skills')
            .set('Authorization', token);

            expect(result.body.status).to.equal('success');
            expect(result.body).to.contain.property('skill');
        } catch (error) {
            console.log(error);
        }
    })

    it('Should return skill with id input', async() => {
        try {
            const result = await chai
            .request(app)
            .get(`/admin/skills/${skillID}`)
            .set('Authorization', token);

            expect(result.body.status).to.equal('success');
        } catch (error) {
            console.log(error);
        }
    })

    it('Create new skill', async() => {
        try {
            const result = await chai
            .request(app)
            .post(`/admin/skills`)
            .set('Authorization', token)
            .send({name: 'New L6'});

            expect(result.body.status).to.equal('success');
        } catch (error) {
            console.log(error);
        }
    })

    it('Update skill', async() =>{
        try {
            const result = await chai
            .request(app)
            .put(`/admin/skills/${skillID}`)
            .set('Authorization', token)
            .send({ name: 'Updated skill'});

            expect(result.body.status).to.equal('success');
        } catch (error) {
            console.log(error);
        }
    })
})