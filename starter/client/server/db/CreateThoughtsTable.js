//Importing aws-sdk package
const AWS = require('aws-sdk');

//Modifying the AWS config object and connecting to local instance at port 8000
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

//Create DynamoDB service object
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

//Creating the params object
const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH"},  // Partition key
        { AttributeName: "createdAt", KeyType: "RANGE"} // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S"},
        { AttributeName: "createdAt", AttributeType: "N"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

//making a call to DynamoDB and creating the table
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

