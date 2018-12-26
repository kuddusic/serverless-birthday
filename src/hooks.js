const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({apiVersion: '2014-10-06'});

module.exports.pre4get = (event, context, callback) => {
  var deploymentId = event.DeploymentId;
  var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  console.log('Check some stuff before shifting traffic...');

  var params = {
      deploymentId: deploymentId,
      lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
      status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
  };

  return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
    .then(data => callback(null, 'Validation test succeeded'))
    .catch(err => callback('Validation test failed'));
};

module.exports.post4get = (event, context, callback) => {
  var deploymentId = event.DeploymentId;
  var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

  console.log('Check some stuff after shifting traffic...');

  var params = {
      deploymentId: deploymentId,
      lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
      status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
  };

  return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
    .then(data => callback(null, 'Validation test succeeded'))
    .catch(err => callback('Validation test failed'));
};
module.exports.pre4put = (event, context, callback) => {
    var deploymentId = event.DeploymentId;
    var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
  
    console.log('Check some stuff before shifting traffic...');
  
    var params = {
        deploymentId: deploymentId,
        lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
        status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
    };
  
    return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
      .then(data => callback(null, 'Validation test succeeded'))
      .catch(err => callback('Validation test failed'));
  };
  
  module.exports.post4put = (event, context, callback) => {
    var deploymentId = event.DeploymentId;
    var lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
  
    console.log('Check some stuff after shifting traffic...');
  
    var params = {
        deploymentId: deploymentId,
        lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
        status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
    };
  
    return codedeploy.putLifecycleEventHookExecutionStatus(params).promise()
      .then(data => callback(null, 'Validation test succeeded'))
      .catch(err => callback('Validation test failed'));
  };
