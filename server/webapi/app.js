import express from "express";
import bodyParser from "body-parser";

import { dbConnection } from "../persistence/dbConnection.js";
import { localClient } from "../persistence/mongoClients.js";

import documentsQueries from "./routes/documentsQueries.js";
import directoriesQueries from "./routes/directoriesQueries.js";
import usersQueries from "./routes/usersQueries.js";
import filesQueries from "./routes/filesQueries.js";
import commonQueries from "./routes/commonQueries.js";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/documents", documentsQueries);
app.use("/api/directories", directoriesQueries);
app.use("/api/users", usersQueries);
app.use("/api/files", filesQueries);
app.use("/api/common", commonQueries);

localClient
  .connect()
  .then(() => {
    app.listen(5000, () => {
      console.log(
        "[" + new Date().toLocaleString() + "] API Server is running..."
      );
      dbConnection();
    });
  })
  .catch((err) => console.log(err));
