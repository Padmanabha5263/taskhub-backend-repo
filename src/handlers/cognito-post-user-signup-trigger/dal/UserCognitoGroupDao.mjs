// class that helps to add user to group on post signup confirmation 

import { AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import { COGNITO_USER_GROUP } from "../helper/constants.mjs";

export class CognitoDao {
    constructor(userPoolId, Username, cognitoClient) {
        this.cognitoClient = cognitoClient;
        this.userPoolId = userPoolId;
        this.Username = Username;
    }

    addUserToGroup = async () => {
        await this.cognitoClient.send(new AdminAddUserToGroupCommand({
            UserPoolId: this.userPoolId,
            Username: this.userName,
            GroupName: COGNITO_USER_GROUP,
        }))
    }
}