import { faker } from "@faker-js/faker";
import { consoleDate } from "../utils.js";
import { usersCollection } from "../../context.js";

export const seedingUsers = async () => {
  for (let j = 0; j < 30; j++) {
    let fullName = faker.name.fullName();

    let user = {
      Name: fullName,
      Email: faker.internet.email(fullName),
      UserName: faker.internet.userName(fullName),
      Company: faker.company.name(),
      Department: faker.commerce.department(),
      Password: faker.internet.password(10, true),
      Address: faker.address.streetAddress(),
      PhoneNumber: faker.phone.number()
    };

    let result = await usersCollection.insertOne(user);

    if (result.acknowledged)
      console.log("["+consoleDate+"] User successful insertion, row = " + j + ", with _id = " + result.insertedId);
  }
};
