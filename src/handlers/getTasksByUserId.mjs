import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

let client;
if (process.env.IS_OFFLINE) {
  client = new DynamoDBClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID.toString(),
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.toString(),
      sessionToken: process.env.AWS_SESSION_TOKEN.toString(),
    },
  });
} else {
  client = new DynamoDBClient({ region: "ap-south-1" });
}

export const getTasksByUserIdHandler = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  const queryParams = {
    TableName: "task",
    ProjectionExpression: "taskname,description,id",
    IndexName: "userid-index",
    KeyConditionExpression: "userid = :userid", // Filter where userId equals the given ID
    ExpressionAttributeValues: {
      ":userid": event.userid,
    },
  };

  try {
    const command = new QueryCommand(queryParams);
    const response = await client.send(command);
    return {
      statusCode: 200,
      message: "Successfully retrieved tasks",
      data: response.Items || [],
    };
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return {
      statusCode: 500,
      message: `Failed to retrieve tasks: ${error.message}`,
      data: [],
    };
  }
};
