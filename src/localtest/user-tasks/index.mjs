
// import event from "./events/createTaskSuccess.json" with {type: "json"}
// import event from "./events/deleteTaskSuccess.json" with {type: "json"}
import event from "./events/getTasksByUserIdSuccess.json" with {type: "json"}
import { handler } from "../../handlers/user-tasks/index.mjs"

handler(event).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})