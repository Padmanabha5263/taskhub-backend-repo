import event from "../events/greetings/greetings.json" with { type: "json" };
import { SayHelloHandler } from "../handlers/taskHandlers/functions/sayHello.mjs";

SayHelloHandler(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
