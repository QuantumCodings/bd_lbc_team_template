// Function to place an order
async function placeOrder(memberID, price, address, discountCode = null, deliveryTime = null) {
  const orderDetails = {
    memberID: memberID,
    price: price,
    address: address
  };

  // Add optional fields if provided
  if (discountCode) {
    orderDetails.discountCode = discountCode;
  }
  if (deliveryTime) {
    orderDetails.deliveryTime = deliveryTime;
  }

  try {
    const response = await axios.post("http://www.Squeeze & Steep.com/order", orderDetails, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY_HERE',  // Replace with your actual API key
      }
    });

    console.log("Order placed successfully:", response.data);
    return response.data;  // Return the response for further handling
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

// Example usage:
placeOrder("testMember", 15.99, "123 Main St, Cityville, ST 12345", "DISCOUNT2025", "2025-02-06T15:30:00Z");

