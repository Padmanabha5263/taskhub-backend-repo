import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoUserGroup, PAYLOAD_MISSING_MESSAGE } from "./helper/constants.mjs";


// initialize DynamoDB Document Client
const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" })
);

// initialize Cognito Identity Provider Client 
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || "ap-south-1" });

// Lambda handler function to add user to DynamoDB on Cognito post-confirmation trigger
export const handler = async (event) => {
    const userAttributes = event.request.userAttributes;

    if (!userAttributes.sub || !userAttributes.email) {
        console.error(PAYLOAD_MISSING_MESSAGE);
        return event;
    }

    try {
        // Save user details to DynamoDB once user created successfully in Cognito
        await docClient.send(new PutCommand({
            TableName: 'user',
            Item: {
                id: userAttributes.sub,
                name: userAttributes.name,
                user_email: userAttributes.email,
                created_at: new Date().toISOString()
            }
        }));

        // Add user to the Cognito User Group
        await cognitoClient.send(new AdminAddUserToGroupCommand({
            UserPoolId: event.userPoolId,
            Username: event.userName,
            GroupName: CognitoUserGroup,
        }))
    }
    catch (error) {
        console.error("Error saving user to DynamoDB:", error.message);
    }
    return event
};