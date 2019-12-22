import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as df from "durable-functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request with durable entities.');

    const name = req.query.name;
    if (name) {
        const client = df.getClient(context);
        const entityId = new df.EntityId("Counter", req.query.name);

        let entityState = await client.readEntityState(entityId);
        await client.signalEntity(entityId, "add", 1);

        context.res = {
            body: "The current state value is " + entityState.entityState
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string"
        };
    }
};

export default httpTrigger;
