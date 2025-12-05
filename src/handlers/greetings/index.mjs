import { Greetigs } from "./dao/GreetingsDao.mjs";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "./helper/constants.mjs";

export const SayHelloHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  const result = new Greetigs(event?.arguments?.name).greet()
  try {
    const name = event?.arguments?.name || "Guest";
    return {
      statusCode: 200,
      message: SUCCESS_MESSAGE,
      data: result,
    };
  } catch (error) {
    return {
      success: 500,
      message: `${ERROR_MESSAGE} ${error.message}`,
      data: null,
    };
  }
};
