import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { COGNITO_USER_GROUP, PAYLOAD_MISSING_MESSAGE } from "./helper/constants.mjs";
import { User } from "./Dal/UserDao.mjs";
import { CognitoDao } from "./dal/UserCognitoGroupDao.mjs";


// initialize DynamoDB Document Client
const docClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" })
);

// initialize Cognito Identity Provider Client 
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || "ap-south-1" });

// Lambda handler function to add user to DynamoDB on Cognito post-confirmation trigger
export const handler = async (event) => {
    const userAttributes = event.request.userAttributes;

    try {
        // Save user details to DynamoDB once user created successfully in Cognito
        const userObj = new User(userAttributes.sub, userAttributes.name, userAttributes.email, docClient)
        await userObj.addUserToTable()

        // Add user to the Cognito User Group
        const cognitoObj = new CognitoDao(cognitoClient, event.userPoolId, event.userName)
        await cognitoObj.addUserToGroup()
    }
    catch (error) {
        console.error("Error saving user to DynamoDB:", error.message);
    }
    return event
};