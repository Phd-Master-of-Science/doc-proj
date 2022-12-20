import { directoriesCollection, documentsCollection } from "./context.js";

export const createIndexes = async () => {
  const directoriesIndex = await directoriesCollection.createIndex(
    { Category: 1, UserId: 1 },
    { name: "_directories_index_" }
  );
  console.log(
    `[${new Date().toLocaleString()}] Index created: ${directoriesIndex}`
  );

  const documentsIndex = await documentsCollection.createIndex(
    { "Versions.Editors.User._id": 1, "Versions.Action": 1 },
    { name: "_documents_index_" }
  );
  console.log(
    `[${new Date().toLocaleString()}] Index created: ${documentsIndex}`
  );
};
