const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB();

const createGSI = async () => {
    const params = {
        TableName: "Orders", // Change to your table name
        AttributeDefinitions: [
            { AttributeName: "memberID", AttributeType: "S" } // Define the new attribute you're indexing on
        ],
        GlobalSecondaryIndexUpdates: [
            {
                Create: {
                    IndexName: "MemberIDIndex", // Name of the index
                    KeySchema: [
                        { AttributeName: "memberID", KeyType: "HASH" }, // partition key of the GSI
                        { AttributeName: "orderID", KeyType: "RANGE" }  // optional sort key of the GSI
                    ],
                    Projection: {
                        ProjectionType: "ALL" // You can use "ALL" or specify which attributes to project (e.g., "KEYS_ONLY" or "INCLUDE")
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 5,
                        WriteCapacityUnits: 5
                    }
                }
            }
        ]
    };

    try {
        const data = await dynamoDB.updateTable(params).promise();
        console.log("GSI created successfully:", data);
    } catch (error) {
        console.error("Error creating GSI:", error);
    }
};

createGSI();