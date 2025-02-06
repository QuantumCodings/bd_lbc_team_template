const createPreviousOrdersTable = async () => {
    const params = {
        TableName: "PreviousOrders",
        KeySchema: [
            { AttributeName: "orderID", KeyType: "HASH" }  // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "orderID", AttributeType: "S" },
            { AttributeName: "memberID", AttributeType: "S" },
            { AttributeName: "price", AttributeType: "N" },
            { AttributeName: "address", AttributeType: "S" },
            { AttributeName: "date", AttributeType: "S" }
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

createPreviousOrdersTable();