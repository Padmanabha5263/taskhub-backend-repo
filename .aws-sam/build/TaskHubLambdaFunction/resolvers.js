export const lambdaHandler = async (event, context) => {
  console.log("Event: ", JSON.stringify(event, null, 2));
  return "Hello! this is the first appsync graphql";
};
