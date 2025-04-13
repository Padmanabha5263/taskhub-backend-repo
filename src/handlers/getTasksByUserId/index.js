import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION;
const tableName = "task";
const client = new DynamoDBClient({ region });

export const getTasksByUserIdHandler = async (event) => {
  const scanParams = {
    TableName: tableName,
    ProjectionExpression: "taskname,description,id",
    FilterExpression: "userid = :userid", // Filter where userId equals the given ID
    ExpressionAttributeValues: {
      ":userid": event.arguments.userid,
    },
  };
  try {
    const command = new ScanCommand(scanParams);
    const response = await client.send(command);

    return response.Items;
  } catch (error) {
    return {
      statusCode: 500,
      body: {
        error: "Failed to scan DynamoDB table",
        details: error.message,
      },
    };
  }
};
