export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error - Status:", error.response.status);
    console.error("API Error - Data:", error.response.data);
    return (
      error.response.data.message ||
      "An error occurred while processing your request."
    );
  } else if (error.request) {
    console.error("API Error - No Response:", error.request);
    return "No response received from the server.";
  } else {
    console.error("API Error - Request Error:", error.message);
    return "An error occurred while making the request.";
  }
};
