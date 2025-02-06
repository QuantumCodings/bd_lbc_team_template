// Function to subscribe to event notifications
async function subscribeToEventNotifications(memberID, email) {
    const subscriptionDetails = {
        memberID: memberID,
        email: email
    };

    try {
        const response = await axios.post("http://www.Squeeze & Steep.com/events", subscriptionDetails, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE',  // Replace with your actual API key
            }
        });

        console.log("Subscribed to event notifications:", response.data);
        return response.data;  // Return the response for further handling
    } catch (error) {
        console.error("Error subscribing to event notifications:", error);
    }
}

// Example usage:
subscribeToEventNotifications("testMember", "example@example.com");
