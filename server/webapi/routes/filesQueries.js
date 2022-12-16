import express from "express";

import fileByIdQuery from "../../application/files/fileByIdQuery.js";
import filesQuery from "../../application/files/filesQuery.js";

const router = express.Router();

//http://localhost:5000/api/files?pageNumber=2&pageSize=10
router.get("/", filesQuery)
router.get("/:id", fileByIdQuery)

export default router;