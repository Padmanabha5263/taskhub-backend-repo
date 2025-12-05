
// class helps to add signup user details to dynamodb user table 
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { PAYLOAD_MISSING_MESSAGE, USER_TABLE_NAME } from '../helper/constants.mjs';
import { ValidationError } from '../helper/exceptions.mjs';


export class User {
    constructor(id, username, user_email, docDBClient) {
        this.sub = id;
        this.name = username;
        this.email = user_email;
        this.docDBClient = docDBClient;
    }

    addUserToTable = async () => {
        try {

            if (!this.sub || !this.email) {
                throw new ValidationError(PAYLOAD_MISSING_MESSAGE);
            }

            // Save user details to DynamoDB once user created successfully in Cognito
            await this.docDBClient.send(new PutCommand({
                TableName: USER_TABLE_NAME,
                Item: {
                    id: this.sub,
                    name: this.name,
                    user_email: this.email,
                    created_at: new Date().toISOString()
                }
            }));
            console.log("User Added to the table")
        }
        catch (error) {
            console.error("Error saving user to DynamoDB:", error.message);
        }
    }
}