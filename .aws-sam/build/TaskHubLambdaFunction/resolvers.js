import { sayHello } from "./greetings.js";

export const lambdaHandler = async (event, context) => {
  console.log("Event: ", JSON.stringify(event));
  const { fieldName } = event.info;
  console.log("Field Name: ", fieldName);
  if (fieldName === "sayHello") {
    return sayHello(event);
  } else {
    throw new Error(`Unhandled field: ${fieldName}`);
  }
};
