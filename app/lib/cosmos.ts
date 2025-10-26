import { CosmosClient } from "@azure/cosmos";

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
export const container = database.container(containerId);

export default client;
