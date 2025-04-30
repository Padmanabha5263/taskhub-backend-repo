import { SayHelloHandler } from "../src/handlers/sayHello.mjs";
import event from "../events/greetings.json" assert { type: "json" };

SayHelloHandler(event)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
