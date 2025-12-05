import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { currentDateTime, generateId } from "./helper.mjs";
import { CREATE_TASK_FAILURE_MSG, CREATE_TASK_SUCCESS_MSG, DELETE_TASK_FAILURE_MSG, DELETE_TASK_SUCCESS_MSG, FETCH_TASK_FAILURE_MSG, FETCH_TASK_SUCCESS_MSG, UPDATE_TASK_FAILURE_MSG, UPDATE_TASK_SUCCESS_MSG } from "./constants.mjs";




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
                message: CREATE_TASK_SUCCESS_MSG,
            };
        } catch (error) {
            return {
                data: [],
                statusCode: 500,
                message: `${CREATE_TASK_FAILURE_MSG}: ${error.message}`,
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
                message: FETCH_TASK_SUCCESS_MSG,
                data: response.Items ? response.Items : [],
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: `${FETCH_TASK_FAILURE_MSG}: ${error.message}`,
                data: [],
            };
        }
    }

    // update the task based on the task id
    async updateTask(userid, taskid, description, taskname) {
        try {
            const response = await this.docDbClient.send(
                new PutCommand({
                    TableName: "user-tasks",
                    Item: {
                        user_id: userid,
                        id: taskid,
                        description: description,
                        taskname: taskname,
                        created_at: currentDateTime(),
                    },
                    ReturnValues: "ALL_OLD",
                })
            );
            return {
                statusCode: 200,
                message: UPDATE_TASK_SUCCESS_MSG,
                data: response.Attributes ? [response.Attributes] : [],
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: `${UPDATE_TASK_FAILURE_MSG}: ${error.message}`,
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
                message: DELETE_TASK_SUCCESS_MSG,
                data: response.Attributes ? [response.Attributes] : [],
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: `${DELETE_TASK_FAILURE_MSG}: ${error.message}`,
                data: [],
            };
        }
    }
}