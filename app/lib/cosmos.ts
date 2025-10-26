import { CosmosClient, Container } from "@azure/cosmos";

let containerInstance: Container;

function getDbContainer(): Container {
  if (containerInstance) {
    return containerInstance;
  }

  const connectionString = process.env.COSMOS_CONNECTION_STRING;
  const databaseId = "RezcutDB";
  const containerId = "Settings";

  if (!connectionString) {
    throw new Error(
      "Azure Cosmos DB connection string is not configured in environment variables."
    );
  }

  const client = new CosmosClient(connectionString);
  const database = client.database(databaseId);
  containerInstance = database.container(containerId);

  return containerInstance;
}
export { getDbContainer };
