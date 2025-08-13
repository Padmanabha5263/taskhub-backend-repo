import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { createTaskHandler } from "../handlers/taskHandlers/functions/createTask.mjs";
import event from "../events/createTask/createTaskSuccess.json" with {type:"json"}
const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-south-1" })
);

createTaskHandler(event, client).then((res)=>{
console.log(res)
}).catch((err)=>{
console.log(err)
})