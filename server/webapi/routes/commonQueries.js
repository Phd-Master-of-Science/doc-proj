import express from "express";

import actionsQuery from "../../application/common/actionsQuery.js";
import seedingsQuery from "../../application/common/seedingsQuery.js";

const router = express.Router();

router.get("/seedings", seedingsQuery)
router.get("/actions", actionsQuery)

export default router;