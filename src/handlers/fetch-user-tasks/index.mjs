import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "./helper/constants.mjs";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";


// documentdb client for interacting with DynamoDB
const docDBClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-south-1" })
);

// Handler to fetch tasks by user ID
export const getTasksByUserIdHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  const queryParams = {
    TableName: "task",
    ProjectionExpression: "taskname,description,id",
    IndexName: "userid-index",
    KeyConditionExpression: "userid = :userid", // Filter where userId equals the given ID
    ExpressionAttributeValues: {
      ":userid": event.arguments.userid,
    },
  };

  try {
    const command = new QueryCommand(queryParams);
    const response = await docDBClient.send(command);
    return {
      statusCode: 200,
      message: SUCCESS_MESSAGE,
      data: response.Items || [],
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: `${ERROR_MESSAGE} ${error.message}`,
      data: [],
    };
  }

};
