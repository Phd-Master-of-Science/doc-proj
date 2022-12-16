import { consoleDate } from "../utils.js";
import {
  directoriesCollection,
  documentsCollection,
} from "../../context.js";

export const seedingDirectories = async () => {
  let documents = await documentsCollection.find({}).toArray();

  let directories = [];
  documents.forEach(async (document) => {
    let currentVersion = document.Versions[document.Versions.length - 1];

    currentVersion.Editors.forEach(async (editor) => {
      let directory = {
        DocumentId: document._id,
        UserId: editor.User._id,
        Title: currentVersion.Title,
        LastUpdate: currentVersion.LastUpdate.Date,
        Category: currentVersion.Action,
        FirstEditor: editor.User.Name,
        Publisher: editor.User.Email
      };
      directories.push(directory);
    });
  });

  let resultDirectories = await directoriesCollection.insertMany(directories);
  if (resultDirectories.acknowledged)
    console.log("["+consoleDate+"] Directory successful insertion, count = " + resultDirectories.insertedCount);
};
