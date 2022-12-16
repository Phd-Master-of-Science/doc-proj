import { seedings } from "./data/seedings.js";
import { consoleDate } from "../persistence/data/utils.js";
import { createIndexes } from "./createIndexes.js";
import { localClient } from "./mongoClients.js";

const client = localClient;

export const dbConnection = async () => {
  try {
    await client.connect();
    console.log("["+consoleDate+"] Connected correctly to server");
    await seedings();
    await createIndexes();
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
    console.log("["+consoleDate+"] Indexing finished.");
    console.log("["+consoleDate+"] Seeding finished.");
  }
};
