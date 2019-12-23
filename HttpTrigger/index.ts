import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as df from "durable-functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request with durable entities.');

    const name = req.query.name;
    if (name) {

        const client = df.getClient(context);
        const entityId = new df.EntityId("Counter", req.query.name);

        if (req.method == "GET") {

            let entityState = await client.readEntityState(entityId);

            context.res = {
                body: "The current state value of the entity " + req.query.name + " is " + entityState.entityState
            };
        }
        else if (req.method == "POST") {

            const increment: unknown = (req.query.increment ? req.query.increment : 1)
            const incrementValue: number = Number(increment);

            await client.signalEntity(entityId, "add", incrementValue);

            context.res = {
                body: "The current state value of the entity " + req.query.name + " was increased by " + incrementValue
            };
        }
        else if (req.method == "DELETE") {
            client.signalEntity(entityId, "reset");

            context.res = {
                body: "The state value of the entity " + req.query.name + " was reset to zero"
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string"
        };
    }
};

export default httpTrigger;
