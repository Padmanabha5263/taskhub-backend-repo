# Serverless Appsync api with SAM framework

creating the serverless appsync graphql api using the services like lambda, dynamodb, appsync service using SAM framework.

### Project installation guide
1. first thing you should have aws account with developer role and login to your aws account <br/>
. make sure you have installed vscode, aws sam cli, aws cli, git, nodejs softwares in your system <br/>
. download the project with git clone command<br/>
. execute aws sso login --profile aws-developer-profile-role  <br/>
. execute sam validate <br/>
. execute sam build<br/>
. execute sam deploy --guided --profile aws-developer-profile-role <br/>


### AWS SAM Commands

1. **sam validate** <br/> this command will validate the infrastructure code i,e .yaml file.
2. **sam build** <br/> this command will create an build file.
3. **sam local invoke TaskHubLambdaFunction --event events/event.json --log-file sam-log.txt**<br/> This command will execute the lambda function(TaskHubLambdaFunction) locally with docker.
4. **sam init** <br/> initlise the sam project
5. **sam deploy --guided --profile profile-name** <br/> this command will deploy the build file which is created using sam build command and you can verify the change after successfull deployment
6. **aws sso login --profile profile-name** <br/> login to the aws via cli way

## GraphQL Api

1. **sayHello** <br/> this is an query type which greet the user.
2. **getTasksByUserId** <br/> this is an query type which list all the tasks created by the perticular user.

# Impotant Links

1. markdown:<br/>
   https://www.markdownguide.org/cheat-sheet/ <br/>
   https://code.visualstudio.com/docs/languages/markdown#_markdown-preview
2. convert markdown file to pdf,word online: <br/>
   https://cloudconvert.com/md-to-docx
3. adding the authentication to the graphql api via SAM:<br/>
   https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-graphqlapi.html<br/>
   https://medium.com/@ednergizer/multiple-authorization-methods-in-a-single-graphql-api-with-aws-appsync-security-at-the-data-7feeaa968486
4. graphql sam yml template for both dynamodb and lambda as a datasource: <br/>
   https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-graphqlapi.html
