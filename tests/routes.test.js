const test = require('tape');
const request = require('supertest');
const app = require('./../src/app');

test('Testing ????', (t) => {
    request(app)
        .get('')
        .expect(200)
        .expect('Content-Type', /json/) //check
        .end(function(err, res) {
            t.error(err)
            t.end();
        })
})