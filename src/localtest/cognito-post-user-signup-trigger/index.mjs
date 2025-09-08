import event from "./events/cognito.json" with { type: "json" };
import { handler } from "../../handlers/cognito-post-user-signup-trigger/index.mjs";



// This is a local test for the Cognito post user signup trigger
handler(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
