const request = require('supertest');

beforeAll(() => {
    process.env.NODE_ENV = 'test'
});

describe('Just testing', () => {
    it("return true for truthfull", () => {
        expect(true).toBe(true)
    })
});