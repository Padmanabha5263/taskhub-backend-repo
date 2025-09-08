import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "./helper/constants.mjs";

export const SayHelloHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  try {
    const name = event?.arguments?.name || "Guest";
    return {
      statusCode: 200,
      message: SUCCESS_MESSAGE,
      data: `Hello, ${name}! Welcome to TaskHub.`,
    };
  } catch (error) {
    return {
      success: 500,
      message: `${ERROR_MESSAGE} ${error.message}`,
      data: error.message,
    };
  }
};
