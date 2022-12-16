import { consoleDate } from "./data/utils.js";

import { directoriesCollection, documentsCollection } from "./context.js";

export const createIndexes = async () => {
  const directoriesIndex = await directoriesCollection.createIndex({ Category: 1, UserId: 1 });
  console.log(`[${consoleDate}] Index created: ${directoriesIndex}`);

  const documentsIndex = await documentsCollection.createIndex({ "Versions.Editors.User._id": 1, "Versions.Action": 1 });
  console.log(`[${consoleDate}] Index created: ${documentsIndex}`);
};