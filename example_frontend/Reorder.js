// Function to fetch previous orders for a member
async function fetchPreviousOrders(memberID) {
    try {
        const response = await axios.get(`http://www.Squeeze & Steep.com/orders/${memberID}`, {
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE',  // Replace with your actual API key
            }
        });

        console.log("Previous Orders:", response.data);
        return response.data;  // Return order data for further use
    } catch (error) {
        console.error("Error fetching previous orders:", error);
    }
}

// Example usage:
fetchPreviousOrders("testMember");
