import { Task } from "./taskDao.mjs";

// initialising the object for the Task class
const taskObj = new Task()

// lambda function handler to create user task 
export const handler = async (event) => {
    const { userid, description, taskname, taskid } = event.arguments
    console.log("event", event);
    try {
        // event.field is the name of the query or mutation
        switch (event.field) {
            case "createTask":
                return await taskObj.createTask(userid, description, taskname)
            case "deleteTaskById":
                return await taskObj.deleteTask(userid, taskid)
            default:
                break;
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: `Failed! please check the request: ${error.message}`,
        };
    }
}