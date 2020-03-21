# Simple Azure Function with Durable Entity

## Content
This code repository contains a simple HTTP-triggered Azure function with a durable entity serving as a counter. This setup is propably the easiest way to get a first impression on Azure Durable Entitie on how they work.

## Setup
Make sure that all requirements for local development of durable functions are fulfilled as described in the [official documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites).

In addition I installed the extensions not via [Extension Bundle](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites) but used the `func install` option i. e. `func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.2.0`. (reason, see below)
 
## How to Call
* Start the function locally via `npm run start`
* Use the REST client/CLI you like and trigger the following actions in the durable entity:
  * a **GET** request at `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>` to get the current value of durable entity `<NameOfTheDurableEntity>`
  * a **POST** request at `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>` to increase the value of durable entity `<NameOfTheDurableEntity>`. 
  Here you have two options:
    * Using `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>` will increase the value by one
    * Using `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>&increment=<incrementValue>` will add thze value of the query parameter `increment`
  * a **DELETE** request at `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>` to reset the state of the durable entity `<NameOfTheDurableEntity>` to zero


By changing the `<NameOfTheDurableEntity>` you will se how things work, even after you stopped the function and restarted it.

## Deviations from the official documentation (as of 23.12.2019)
The following mismatch with respect to the current [official documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/durable-functions-entities) exists :
* The extensions are not installed via extension bundle as the extension `entityTrigger` is not recognized (which is consistent with the [extension bundle JSON](https://github.com/Azure/azure-functions-extension-bundles/blob/master/src/Microsoft.Azure.Functions.ExtensionBundle/extensions.json) ), but via `func install`. This is current state of the art as described in the release notes of [version 2.2.0](https://github.com/Azure/azure-functions-durable-extension/releases) 
* The binding of the EntityClient is an inbound binding as it would be for a OrchestrationClient. The documentation is not consistent here. It is ambivalent if you use in- or outbound binding, but I would stick to the status quo of the orchestration client 

## Updates 
### 03/21/2020
* Tested with Function runtime V3 (nodeJS 12 LTS) and Durable Extension 2.2.0
* Added file `RESTcalls.http`. This way you can use the [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) of Visual Studio Code to issue the calls
