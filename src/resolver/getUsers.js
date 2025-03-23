import AWS from "aws-sdk";
const TABLE_NAME = "Users";

// get all the users from the table

const dynamo = new AWS.DynamoDB.DocumentClient();
export const getUserInformation = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await dynamo.scan(params).promise();
  return result.Items || [];
};
