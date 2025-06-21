import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getTasksByUserIdHandler } from "./functions/getTasksByUserId.mjs";
import { SayHelloHandler } from "./functions/sayHello.mjs";
import { deleteTaskByIdHandler } from "./functions/deleteTaskById.mjs";
import { createTaskHandler } from "./functions/createTask.mjs";

const docDBClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-south-1" })
);

export const taskHubApiHandler = async (event) => {
  console.log("recieved_event", event);
  let response = null;
  switch (event.field) {
    case "sayHello":
      response = await SayHelloHandler(event);
      break;
    case "getTasksByUserId":
      response = await getTasksByUserIdHandler(event, docDBClient);
      break;
    case "deleteTaskById":
      response = await deleteTaskByIdHandler(event, docDBClient);
      break;
    case "createTask":
      response = await createTaskHandler(event, docDBClient);
      break;
    default:
      response = {
        statusCode: 400,
        message: "Unsupported field or operation",
        data: [],
      };
      break;
  }
  if (response) return response;
};
