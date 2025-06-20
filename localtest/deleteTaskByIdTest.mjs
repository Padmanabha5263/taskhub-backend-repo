import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import event from "../events/deleteTaskById/deleteTaskByidSuccess.json" with {type:"json"}
import { getTasksByUserIdHandler } from "../handlers/taskHandlers/functions/deleteTaskById.mjs";
const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-south-1" })
);

getTasksByUserIdHandler(event, client).then((res)=>{
console.log(res)
}).catch((err)=>{
  console.log(err)
})    