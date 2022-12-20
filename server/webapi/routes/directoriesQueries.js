import express from "express";

import directoriesQuery from "../../application/directories/directoriesQuery.js";
import randomActionQuery from "../../application/directories/randomActionQuery.js";

const router = express.Router();

router.get("/action/random", randomActionQuery)
//http://localhost:5000/api/documents/open/639adae8c63f323f71f7eb24?pageNumber=2&pageSize=10
router.get("/:option/:userId", directoriesQuery)

export default router;