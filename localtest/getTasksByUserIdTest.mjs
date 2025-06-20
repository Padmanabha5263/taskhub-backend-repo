import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import event from "../events/getTasksByUserId/getTasksByUserIdSuccess.json" with { type: "json" };
import { getTasksByUserIdHandler } from "../handlers/taskHandlers/functions/getTasksByUserId.mjs";
const client = DynamoDBDocument.from(
  new DynamoDBClient({region: "ap-south-1"})
);

getTasksByUserIdHandler(event, client)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
