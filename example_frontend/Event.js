// Function to fetch upcoming events
async function fetchUpcomingEvents() {
  try {
    const response = await axios.get("http://www.Squeeze & Steep.com/events", {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY_HERE',  // Replace with your actual API key
      }
    });

    console.log("Upcoming Events:", response.data);
    return response.data;  // Return event data for further use
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Call the function to see the output
fetchUpcomingEvents();

