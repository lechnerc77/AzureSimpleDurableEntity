# Simple Azure Function with Durable Entity

## Content
This code repository contains a simple HTTP-triggered Azure function with a durable entity serving as a counter. This setup is propably the easiest way to get a first impression on Durable Entities

## Setup
Make sure that all requirements for local development of durable functions are fulfilled as described in the [documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites).

In addition I installed the extensions not via [Extension Bundle](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites)but used the `func install` option i. e. `func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.1.0`. For reason, see below

## How to Call
* Start the function locally via `npm run start`
* Use the REST client/CLI you like and trigger `http://localhost:7071/api/HttpTrigger?name=<NameOfTheDurableEntity>`

By changing the `<NameOfTheDurableEntity>` you will se how things work, even after you stopped the function and restarted it.

## Deviations from the official documentation
The following mismatch with respect to the [official documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/durable-functions-entities) exists:
* The extensions are not installed via extension bundle as the extension `entityTrigger` was not recognized (which is consistent with the [extension bundle JSON](https://github.com/Azure/azure-functions-extension-bundles/blob/master/src/Microsoft.Azure.Functions.ExtensionBundle/extensions.json) ), but via `func install`. This is current state of the art as described in the current release notes of [version 2.1.0](https://github.com/Azure/azure-functions-durable-extension/releases) 
* The binding of the EntityClient is an inbound binding as it would be for a OrchestrationClient. The documentation is not consistent here
* The code to interact with the durable entity is different to the one in section [Example: Client signals an entity](https://docs.microsoft.com/en-US/azure/azure-functions/durable/durable-functions-entities#example-client-signals-an-entity) as a simple function context does not comprise `df`  