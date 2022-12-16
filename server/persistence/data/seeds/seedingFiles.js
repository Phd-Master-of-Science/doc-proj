import { faker } from "@faker-js/faker";
import fs from 'fs';

import { consoleDate } from "../utils.js";
import { filesCollection } from "../../context.js";

export const seedingFiles = async () => {
  if (!fs.existsSync("./files")){
    fs.mkdirSync("./files")
    console.log("["+consoleDate+"] files folder is created!")
  }

  for (let k = 0; k < 5; k++) {
    let content = faker.lorem.paragraphs();
    let filename = faker.system.commonFileName('docx');
    fs.promises.writeFile(`./files/${filename}`, content)
    console.log(filename);

    let file = {
      Description: faker.system.commonFileName('docx'),
      File: fs.readFileSync(`./files/${filename}`)
    };

    let result = await filesCollection.insertOne(file);

    if (result.acknowledged)
      console.log("["+consoleDate+"] File successful insertion, row = " + k + ", with _id = " + result.insertedId);
  }

  fs.rmdirSync("./files", { recursive: true })
  console.log("["+consoleDate+"] files folder is deleted!")
};