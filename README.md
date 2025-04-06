# Serverless Appsync api with SAM framework

creating the serverless appsync graphql api using the services like lambda, dynamodb, appsync service using SAM framework.

### SAM Commands

1. **sam validate** <br/> this command will validate the infrastructure code i,e .yaml file.
2. **sam build**<br/> this command will create an build file.
3. **sam local invoke TaskHubLambdaFunction --event events/event.json --log-file sam-log.txt**<br/> This command will execute the lambda function(TaskHubLambdaFunction) locally with docker.
4. **sam init** initlise the sam project
5. **sam deploy --guided --profile profile-name**

## GraphQL Api

1. **sayHello** <br/> this is an query type which greet the user.
2. **getTasksByUserId** <br/> this is an query type which list all the tasks created by the perticular user.

# Impotant Links

1. markdonw: https://www.markdownguide.org/cheat-sheet/ <br/>
