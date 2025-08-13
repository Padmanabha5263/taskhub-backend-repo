// import event from "./events/greetings.json" with { type: "json" };
import event from "./events/greetingsWithName.json" with { type: "json" };
import { SayHelloHandler } from '../../handlers/greetings/index.mjs'



// This is a local test for the SayHelloHandler greetings lambda function
SayHelloHandler(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
