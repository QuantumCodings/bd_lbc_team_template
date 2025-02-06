const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB();

const createEventsTable = async () => {
    const params = {
        TableName: "Events",
        KeySchema: [
            { AttributeName: "eventID", KeyType: "HASH" }  // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "eventID", AttributeType: "S" },
            { AttributeName: "eventName", AttributeType: "S" },
            { AttributeName: "eventDate", AttributeType: "S" },
            { AttributeName: "location", AttributeType: "S" },
            { AttributeName: "description", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        const data = await dynamoDB.createTable(params).promise();
        console.log("Table created successfully:", data);
    } catch (error) {
        console.error("Error creating table:", error);
    }
};

createEventsTable();
