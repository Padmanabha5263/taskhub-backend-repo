import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { PAYLOAD_MISSING_MESSAGE } from "./helper/constants.mjs";

const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" })
);

export const handler = async (event) => {
    console.log("cognito_event", event);
    const userAttributes = event.request.userAttributes;

    if (!userAttributes.sub || !userAttributes.email) {
        console.error(PAYLOAD_MISSING_MESSAGE);
        return event;
    }

    const userData = {
        id: userAttributes.sub,
        user_email: userAttributes.email,
        user_mobile: userAttributes.phone_number || '',
        created_at: new Date().toISOString()
    };

    try {
        await docClient.send(new PutCommand({
            TableName: 'user',
            Item: userData
        }));
        console.log("User saved to DynamoDB:", userData);
    } catch (error) {
        console.error("Error saving user to DynamoDB:", error);
    }

    return event;
};