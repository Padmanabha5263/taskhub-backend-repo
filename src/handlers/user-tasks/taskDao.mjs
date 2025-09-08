import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { currentDateTime, generateId } from "./helper/constants.mjs";




// Task class: constructor, createTask, deleteTask, updateTask, fetchTask
export class Task {
    constructor() {
        // document client initialisation
        this.docDbClient = new DynamoDBDocumentClient(
            new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" })
        )
    }

    // function that will create the new task
    async createTask(userid, description, taskname) {
        const createTaskInput = {
            user_id: userid,
            id: generateId(),
            description: description,
            taskname: taskname,
            created_at: currentDateTime(),
        }
        try {
            await this.docDbClient.send(new PutCommand({
                TableName: "user-tasks",
                ReturnValues: "NONE",
                Item: createTaskInput
            }))
            return {
                data: [createTaskInput],
                statusCode: 200,
                message: "Successfully created task",
            };
        } catch (error) {
            return {
                data: [],
                statusCode: 500,
                message: `Failed to create the task: ${error.message}`,
            };
        }
    }

    // function to fetch all tasks by userid
    async fetchTasks(userid) {
        try {
            const response = await this.docDbClient.send(
                new ScanCommand({
                    TableName: "user-tasks",
                    FilterExpression: "user_id = :user_id",
                    ExpressionAttributeValues: {
                        ":user_id": userid,
                    },
                })
            );
            return {
                statusCode: 200,
                message: "Successfully fetched tasks",
                data: response.Items ? response.Items : [],
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: `Failed to fetch the tasks: ${error.message}`,
                data: [],
            };
        }
    }

    // function to delete new task by task id, userid
    async deleteTask(userid, taskid) {
        try {
            const response = await this.docDbClient.send(
                new DeleteCommand({
                    TableName: "user-tasks",
                    Key: {
                        user_id: userid,
                        id: taskid,
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
    }
}