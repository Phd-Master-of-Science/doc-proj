import { faker } from "@faker-js/faker";
import { actions, consoleDate } from "../utils.js";
import { fromDate, toDate } from "../utils.js";
import { getRandomInt } from "../utils.js";
import {
  usersCollection,
  documentsCollection,
  filesCollection
} from "../../context.js";

export const seedingDocuments = async () => {
  let users = await usersCollection.find({}).toArray();
  let files = await filesCollection.find({}).toArray();

  //Seeding Documents
  for (let i = 0; i < 100; i++) {
    //#region Create versions
    let versionsNumber = getRandomInt(10) + 1;
    let versions = [];

    for (let v = 0; v < versionsNumber; v++) {
      let current = false;
      if (v === versionsNumber - 1)
        current = true;

      //#region Create recipients
      let recipientsNumber = getRandomInt(10) + 1;
      let recipients = [];

      for (let r = 0; r < recipientsNumber; r++) {
        let userRecipient = users[Math.floor(Math.random() * users.length)];

        let recipient = {
          User: {
            _id: userRecipient._id,
            Name: userRecipient.Name,
            Email: userRecipient.Email
          },
          SendDate: faker.date.between(fromDate, toDate),
        };

        recipients.push(recipient);
      }
      //#endregion Create recipients
      
      //#region Create editors
      let editorsNumber = getRandomInt(10) + 1;
      let editors = [];

      for (let e = 0; e < editorsNumber; e++) {
        let userEditor = users[Math.floor(Math.random() * users.length)];

        let editor = {
          User: {
            _id: userEditor._id,
            Name: userEditor.Name,
            Email: userEditor.Email
          },
          ReadDate: faker.date.between(fromDate, toDate),
        };

        editors.push(editor);
      }
      //#endregion Create editors
      var type = actions[Math.floor(Math.random() * actions.length)];

      let version = {
        Current: current,
        CreatedDate: faker.date.between(fromDate, toDate),
        Title: faker.hacker.phrase(),
        Action: type,
        LastUpdate: {
          User: {
            _id: users[Math.floor(Math.random() * users.length)]._id,
            Name: users[Math.floor(Math.random() * users.length)].Name
          },
          Date: faker.date.between(fromDate, toDate),
        },
        Recipients: recipients,
        Editors: editors,
      };

      versions.push(version);
    }
    //#endregion Create versions
    let filesNumber = getRandomInt(5) + 1;
    let docFiles = [];
    for (let i = 0; i < filesNumber; i++) {
      let file = files[Math.floor(Math.random() * files.length)];
      docFiles.push(file);
    }


    let document = {
      Type: faker.system.commonFileExt(),
      SN: faker.datatype.number(),
      CreatedDate: faker.date.between(fromDate, toDate),
      CompletedDate: faker.date.between(fromDate, toDate),
      Versions: versions,
      Files: docFiles,
    };

    let res = await documentsCollection.insertOne(document);

    if (res.acknowledged)
      console.log("["+consoleDate+"] Document successful insertion, row = " + i + ", with _id = " + res.insertedId);
  }
};
