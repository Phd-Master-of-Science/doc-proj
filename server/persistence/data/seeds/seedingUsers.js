import { faker } from "@faker-js/faker";
import { seedingsCollection, usersCollection, usersRows } from "../../context.js";

export const seedingUsers = async () => {
  const start = new Date();

  for (let j = 0; j < usersRows; j++) {
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
      console.log("["+new Date().toLocaleString()+"] User successful insertion, row = " + j + ", with _id = " + result.insertedId);
  }

  const duration = (new Date() - start)/60000;

  const seed = { 
    Action: "Users seeding",
    Rows: usersRows,
    Duration: `${duration} min`
  };

  await seedingsCollection.insertOne(seed)
};
