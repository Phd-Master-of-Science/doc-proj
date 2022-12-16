import { MongoClient } from "mongodb";

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const localUri = "mongodb://localhost:27017";

export const localClient = new MongoClient(localUri, mongoOptions);
