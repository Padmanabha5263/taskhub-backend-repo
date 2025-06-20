import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
export const deleteTaskByIdHandler = async (event, docDBClient) => {
  try {
    const response = await docDBClient.send(
      new DeleteCommand({
        TableName: "task",
        Key: {
          userid: event.arguments.userid,
          id: event.arguments.id,
        },
        ReturnValues: "ALL_OLD",
      })
    );
    return {
      statusCode: 200,
      message: "Successfully deleted task",
      data: response.Attributes ? [response.Attributes] : [],
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: `Failed to delete the task: ${error.message}`,
      data: [],
    };
  }
};
