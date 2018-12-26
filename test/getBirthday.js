'use strict';

// tests for getBirthday
// Generated by serverless-mocha-plugin
require('mocha-steps');

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('getBirthday', '/src/get.js', 'getBirthday');
let wrapped_save = mochaPlugin.getWrapper('saveBirthday', '/src/create.js', 'saveUserBirthday');

function todayIsBirthdayAsString() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = 1971; // today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  var today = yyyy + "-" + mm + '-' + dd;
  return today;
}

describe('getBirthday', () => {
  before((done) => {
    done();
  });

  it('Return must be 404 for undefined user', () => {
    return wrapped.run({"pathParameters": {"id":"Johnny"} }).then((response) => {
      //console.log(JSON.stringify(response));
      expect(response.statusCode).to.be.equal(404);     
      
    });
  });

  step('Return should be 204 for user Test create!', () => {
    return wrapped_save.run({"pathParameters": {"id":"Test"}, "body":"{\"birthday\":\"2007-05-19\"}" } ).then((response) => {
      //console.log(JSON.stringify(response));      
      expect(response.statusCode).to.be.equal(204);
      
    });
  });

  step('Return should be 200', () => {
    return wrapped.run({"pathParameters": {"id":"Test"} }).then((response) => {
      //console.log(JSON.stringify(response));
      expect(response.statusCode).to.be.equal(200);
      
    });
  });

  var todayStr = todayIsBirthdayAsString();
  //var todayStr = "1971-12-27";
  step('Return should be 204 for user BirthdayBoy create!', () => {
    return wrapped_save.run({"pathParameters": {"id":"BirthdayBoy"}, "body":"{\"birthday\":\"" + todayStr +"\"}" } ).then((response) => {
      //console.log(JSON.stringify(response));      
      expect(response.statusCode).to.be.equal(204);
      
    });
  });

  step('Return message for BirthdayBoy must end with Happy Birthday!', () => {
      return wrapped.run({"pathParameters": {"id":"BirthdayBoy"} }).then((response2) => {
        var message = JSON.parse(response2.body).message;
        //console.log(message);
        //console.log(JSON.stringify(response2));
        expect(message.endsWith("Happy Birthday!")).to.be.true;
      
      });
  });


});
