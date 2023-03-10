import express from "express";

import userByIdQuery from "../../application/users/userByIdQuery.js";
import userRandomQuery from "../../application/users/userRandomQuery.js";
import usersQuery from "../../application/users/usersQuery.js";

const router = express.Router();

//http://localhost:5000/api/users?pageNumber=2&pageSize=10
router.get("/", usersQuery);
router.get("/random", userRandomQuery);
router.get("/:id", userByIdQuery);

export default router;