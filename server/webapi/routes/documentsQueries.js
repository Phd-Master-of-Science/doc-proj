import express from "express";

import documentByIdQuery from "../../application/documents/documentByIdQuery.js";
import documentsQuery from "../../application/documents/documentsQuery.js";

const router = express.Router();

//http://localhost:5000/api/documents/open/639adae8c63f323f71f7eb24?pageNumber=2&pageSize=10
router.get("/:option/:userId", documentsQuery)
router.get("/:id", documentByIdQuery)

export default router;