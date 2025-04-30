import { getTasksByUserIdHandler } from "../src/handlers/getTasksByUserId.mjs";

const event = {
  userid: "1234232323625342",
  arguments: {
    userid: "1234232323625342",
  },
  identity: null,
  source: null,
  request: {
    headers: {
      "x-amzn-appsync-is-vpce-request": "false",
      "x-forwarded-for": "152.58.244.145, 15.158.42.116",
      "cloudfront-is-tablet-viewer": "false",
      "cloudfront-viewer-country": "IN",
      "x-amzn-requestid": "9ec6a5ac-565c-4578-89fe-eabc754291e8",
      "x-amzn-remote-ip": "152.58.244.145",
      via: "1.1 df26f98dc48faec49f463a51b15e8efc.cloudfront.net (CloudFront)",
      "x-api-key": "da2-uracpl3stna3vfekz3jypp5wmy",
      "cloudfront-forwarded-proto": "https",
      "content-type": "application/json",
      "x-amzn-trace-id": "Root=1-67f293bb-38ae2d0372d65d49572cd669",
      "x-amz-cf-id": "lPcY3GlnrchcDsNL1giM3sami9ZLCHDZ-q3YK_9CH6M9AourTyXqCg==",
      "content-length": "203",
      "x-forwarded-proto": "https",
      host: "suozcq7gn5cunezjseieb6ze3e.appsync-api.ap-south-1.amazonaws.com",
      "user-agent":
        "PostmanClient/11.39.5 (AppId=a640b538-13e6-4923-a207-5bc7e41c8930)",
      "cloudfront-is-desktop-viewer": "true",
      accept: "*/*",
      "cloudfront-is-mobile-viewer": "false",
      "x-forwarded-port": "443",
      "cloudfront-is-smarttv-viewer": "false",
      "cloudfront-viewer-asn": "55836",
    },
    domainName: null,
  },
  prev: null,
  info: {
    fieldName: "getTasksByUserId",
    selectionSetList: ["taskname", "id", "description"],
    selectionSetGraphQL: "{\n  taskname\n  id\n  description\n}",
    variables: {},
    parentTypeName: "Query",
  },
  stash: {},
};

getTasksByUserIdHandler(event)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
