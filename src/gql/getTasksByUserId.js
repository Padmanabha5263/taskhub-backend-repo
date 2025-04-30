export function request(ctx) {
  return {
    operation: "Invoke",
    payload: ctx.args,
  };
}

export function response(ctx) {
  return ctx.result;
}
