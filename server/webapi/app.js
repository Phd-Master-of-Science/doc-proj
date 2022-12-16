import express from "express";
import bodyParser from "body-parser";

import { dbConnection } from "../persistence/dbConnection.js";
import { localClient } from "../persistence/mongoClients.js";

import documentsQueries from "./routes/documentsQueries.js";
import directoriesQueries from "./routes/directoriesQueries.js";
import usersQueries from "./routes/usersQueries.js";
import filesQueries from "./routes/filesQueries.js";
import { consoleDate } from "../persistence/data/utils.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/documents", documentsQueries);
app.use("/api/directories", directoriesQueries);
app.use("/api/users", usersQueries);
app.use("/api/files", filesQueries);

localClient
  .connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("["+consoleDate+"] API Server is running...");
      dbConnection();
    });
  })
  .catch((err) => console.log(err));
