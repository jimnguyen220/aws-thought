const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

//Using 'fs' package to read users.json and assign object to allUsers
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8'));

//Loop over allUsers array and create params objecth===
allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username" : user.username,
            "createdAt" : user.createdAt,
            "thought" : user.thought
        }
    };
    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", user.username);
        }
    });
});