'use strict';

var mydocumentClient = require('./dynamodb');


module.exports.getBirthday = async (event, context) => {
  const { id } = event.pathParameters;
  var username = id;
  var params = {
    TableName : process.env.TABLE_NAME,
    ProjectionExpression:"birthday",
      KeyConditionExpression: "#userid = :username",
      ExpressionAttributeNames:{
          "#userid": "userId"
      },
      ExpressionAttributeValues: {
          ":username": username
      }
  };
  //console.log("Querying Birthday table for userid=" + username);
  const response = await mydocumentClient.query(params).promise();
  
  //console.log("Result: " + JSON.stringify(response));
  if (response.Count==0) {
     return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Not Found",
        //input: event,
      })
    };   
  }
          
  var bdateString = response.Items[0].birthday;
  var bdate = bdateString.split("-");
  var greeting= "";
  var today = new Date();
  today.setHours(0,0,0,0);
  var bday = new Date(today.getFullYear(),bdate[1]-1,bdate[2]);
  if( today.getTime() > bday.getTime()) {
      bday.setFullYear(bday.getFullYear()+1);
  }
  var diff = bday.getTime()-today.getTime();
  var days = Math.floor(diff/(1000*60*60*24));

  if (days>0) {
      greeting = "Hello, " + username + "! Your Birthday in " + days + " days";
  }
  else {
      greeting = "Hello, " + username + "! Happy Birthday!";
  }
  //console.log(greeting);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: greeting,
      //input: event,
    })
  };    
    
};