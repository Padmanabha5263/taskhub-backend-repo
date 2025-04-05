import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getTasksByUserId = (event) => {
  console.log("getTasksByUserId_event", event);
};
