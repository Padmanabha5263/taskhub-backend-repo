export function request(ctx) {
  return {
    operation: "Invoke",
    payload: {
      field: ctx.info.fieldName,
      arguments: ctx.args,
      identity: ctx.identity,
      source: ctx.source,
      request: ctx.request,
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
