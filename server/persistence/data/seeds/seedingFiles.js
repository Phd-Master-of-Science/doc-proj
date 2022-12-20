import { faker } from "@faker-js/faker";

import { filesCollection, filesRows, seedingsCollection, usersCollection } from "../../context.js";
import { fromDate, toDate } from "../utils.js";


export const seedingFiles = async () => {
  const start = new Date();

  let users = await usersCollection.find({}).toArray();

  for (let k = 0; k < filesRows; k++) {
    let filename = faker.system.commonFileName('docx');

    let file = {
      Description: filename,
      File: faker.system.directoryPath()+"/"+filename,
      InsertDate: faker.date.between(fromDate, toDate),
      UserId: users[Math.floor(Math.random() * users.length)]._id
    };

    let result = await filesCollection.insertOne(file);

    if (result.acknowledged)
      console.log("["+new Date().toLocaleString()+"] File successful insertion, row = " + k + ", with _id = " + result.insertedId);
  }

  const duration = (new Date() - start)/60000;

  const seed = { 
    Action: "Files seeding",
    Rows: filesRows,
    Duration: `${duration} min`
  };

  await seedingsCollection.insertOne(seed)
};