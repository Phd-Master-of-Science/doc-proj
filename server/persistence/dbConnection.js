import { seedings } from "./data/seedings.js";
import { createIndexes } from "./createIndexes.js";
import { localClient } from "./mongoClients.js";

const client = localClient;

export const dbConnection = async () => {
  try {
    await client.connect();
    console.log("["+new Date().toLocaleString()+"] Connected correctly to server");
    // await seedings();
    await createIndexes();
  } catch (error) {
    console.log(error);
  } finally {
    // await client.close();
    console.log("["+new Date().toLocaleString()+"] Indexing finished.");
    console.log("["+new Date().toLocaleString()+"] Seeding finished.");
  }
};
