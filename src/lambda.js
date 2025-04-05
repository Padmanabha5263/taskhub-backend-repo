// import { getTasksByUserId } from "./resolver/getTasksByUserId.js";
import { sayHello } from "./resolver/greetings.js";

export const lambdaHandler = async (event) => {
  console.log("Event: ", JSON.stringify(event));
  const { fieldName } = event.info;
  console.log("Field Name: ", fieldName); //here field name is nothing but the query/mutation name
  if (fieldName === "sayHello") {
    return sayHello(event);
  }
};
