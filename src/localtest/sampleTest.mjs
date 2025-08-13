import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-south-1" })
);

const sampleHandler = async () => {
  try {
    const command = new DeleteCommand({
      TableName: "test",
      Key: {
        id: "9823777121212",
      },
    });
    const result = await client.send(command);
    return result;
  } catch (error) {
    return error.message;
  }
};

const result = sampleHandler();
console.log("result", result);
