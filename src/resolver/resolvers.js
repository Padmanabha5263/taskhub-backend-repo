import { getUserInformation } from "./getUsers";

export const lambdaHandler = async (event, context) => {
  console.log("Event: ", JSON.stringify(event, null, 2));
  const { field, arguments: args } = event; //field is nothing but the query and mutation items
  switch (field) {
    case "getUserInformation":
      return await getUserInformation();
    default:
      return { error: "Invalid field!" };
  }
};
