import { getTasksByUserIdHandler } from "./resolver/getTasksByUserId.js";
import { sayHelloHandler } from "./resolver/greetings.js";

const resolvers = {
  sayHello: sayHelloHandler,
  getTasksByUserId: getTasksByUserIdHandler,
};
export const lambdaHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const { fieldName } = event.info || {};
  const handler = resolvers[fieldName];
  if (handler) {
    try {
      return await handler(event);
    } catch (error) {
      console.error("Error executing handler for", fieldName, ":", error);
      throw error;
    }
  } else {
    console.error("No handler attached for field:", fieldName);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No handler attached for the request" }),
    };
  }
};
