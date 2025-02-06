const createEventSubscriptionsTable = async () => {
    const params = {
        TableName: "EventSubscriptions",
        KeySchema: [
            { AttributeName: "subscriptionID", KeyType: "HASH" }  // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "subscriptionID", AttributeType: "S" },
            { AttributeName: "memberID", AttributeType: "S" },
            { AttributeName: "email", AttributeType: "S" }
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

createEventSubscriptionsTable();