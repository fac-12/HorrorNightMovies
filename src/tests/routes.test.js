const test = require('tape');
const request = require('supertest');
const app = require('./../app');

test('Testing queries', (t) => {
    request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/) //check
        .end(function(err, res) {
            t.equal(res.body[0].title, 'Split', 'Split is the first title returned');
            t.error(err);
            t.end();
        })
})