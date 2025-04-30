export const SayHelloHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  try {
    const name = event?.name || "Guest";
    return {
      statusCode: 200,
      message: "Successfully greeted",
      data: `Hello, ${name}! Welcome to TaskHub.`,
    };
  } catch (error) {
    return {
      success: 500,
      message: `Something went wrong: ${error.message}`,
      data: error.message,
    };
  }
};
