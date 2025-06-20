import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getTasksByUserIdHandler = async (event, docDBClient) => {
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
      message: "Successfully retrieved tasks",
      data: response.Items || [],
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: `Failed to retrieve tasks: ${error.message}`,
      data: [],
    };
  }
};
