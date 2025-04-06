export const sayHelloHandler = async (event) => {
  return `Hello ${event.arguments.name}! Welcome to AppSync with Lambda`;
};
