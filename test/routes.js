var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function() {
  var url = request.agent('http://localhost:3000');

  describe('#GET Device', function() {
    it('should return error if device channel is out of range', function(done) {
      url.get('/digitaloutput/7/value').end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(501);
        done();
      });
    });

    it('should return value if device channel is valid', function(done) {
      url.get('/digitaloutput/0/value')
      .expect('Content-type', /xml/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.equal(200);
        done();        
      });
    });
  });
});
