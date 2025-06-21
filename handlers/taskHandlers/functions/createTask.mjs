import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { generateId, currentDateTime } from "../helper.mjs";
export const createTaskHandler = async (event, docDBClient) => {
  try {
    await docDBClient.send(
      new PutCommand({
        TableName: "task",
        ReturnValues: "ALL_OLD",
        Item: {
          id: generateId(),
          userid: event.arguments.userid,
          description: event.arguments.description,
          taskname: event.arguments.taskname,
          created_at: currentDateTime(),
        },
      })
    );
    return {
      statusCode: 200,
      message: "Successfully created task",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: `Failed to create the task: ${error.message}`,
    };
  }
};
