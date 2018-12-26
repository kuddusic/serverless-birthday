'use strict';

var mydocumentClient = require('./dynamodb');


module.exports.saveUserBirthday = async (event, context) => {
  const { id } = event.pathParameters;
  const { birthday } = JSON.parse(event.body);
  if (!isValidDate(birthday)) {
      return {
          statusCode:400,
          message:"Bad Request: Invalid Date Format"
      }
  }
  //console.log("Event :" + JSON.stringify(event));
  //console.log("Context:" + JSON.stringify(context));
  var params = {
      Item: {            
          "userId" : id,
          "birthday" : birthday
      },
      TableName : process.env.TABLE_NAME
  };
  var result = await mydocumentClient.put(params).promise();
  //console.log("Result:" + JSON.stringify(result));
  return {
    statusCode: 204     
  };    
};

function isValidDate(dateString)
{
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}