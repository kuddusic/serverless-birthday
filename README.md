# Serverless Birthday REST API via Node.js with DynamoDB backend

Simple REST Api for birthday service. It stores user's birthday and return number of days left for his birthday. Even it greets him. :)

It uses Serverless framework. It has offline server, Dynamo local, mocha test and canary deployment support for zero downtime deploys.

## AWS Service Diagram

![Alt text](aws-service-diagram.png?raw=true "Service Diagram")

## Setup

```bash
npm install
```
## Offline development 
```bash
sls offline start
```
## DynamoDB local support
```bash
sls dynamodb start
sls dynamodb migrate
```
## Deploy
After tests are finished successfully, one can deploy the stack on dev via:
```bash
serverless deploy
```
just update the function:

```bash
serverless deploy -f functionName
```

if everything is ok then deploy for production.

```bash
serverless deploy --stage=prod
```

Serverless uses CloudForm to update stack.

## Canary Deploy (minimum downtime)
Thanks to serverless-plugin-canary-deployments plugin new Lambda functions. The plugin relies on the AWS Lambda traffic shifting feature to balance traffic between versions and AWS CodeDeploy to automatically update its weight. It modifies the CloudFormation template generated by Serverless, so that:

1. It creates a Lambda function Alias for each function with deployment settings.
2. It creates a CodeDeploy Application and adds a CodeDeploy DeploymentGroup per Lambda function, according to the specified settings.
3. It modifies events that trigger Lambda functions, so that they invoke the newly created alias.

## Usage

You can create, retrieve, update  birthday users with the following commands:

### Create a User

```bash
curl -X PUI http://localhost:3000/hello/John --data '{ "birthday": "2000-01-01" }'
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/hello/John --data '{ "birthday": "2000-01-01" }'
```
in windows

```bash
curl -X PUI http://localhost:3000/hello/John  --data "{ \"birthday\": \"2000-01-01\" }"
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/hello/John --data "{ \"birthday\": \"2000-01-01\" }"
```


### Get User Birthday

```bash
curl http://localhost:3000/hello/John
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/hello/John
```

Example output:
```bash
{"message":"Hello, John! Your Birthday in 6 days"}
{"message":"Hello, Bob! Happy Birthday!"}
```

## Testing
Mocha testing framework is integrated with Serverless framework. 

In order to test functions
```bash
serverless invoke test
```
Example output:
```bash
  getBirthday
  getBirthday
    √ Return must be 404 for undefined user (719ms)
    √ Return must be 404 for undefined user (750ms)
    √ Return should be 200 (473ms)
    √ Return should be 200 (490ms)
    √ Return should be 204 for user BirthdayBoy create! (459ms)
    √ Return should be 204 for user BirthdayBoy create! (469ms)
    √ Return message for BirthdayBoy must end with Happy Birthday! (477ms)

  saveBirthday
    √ Return message for BirthdayBoy must end with Happy Birthday! (487ms)

  saveBirthday
    √ Return statusCode must be 204 for create or update (459ms)
    √ Return statusCode must be 400 for invalid date
```