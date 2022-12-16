import { consoleDate } from "../../persistence/data/utils.js";
import { usersCollection } from "../../persistence/context.js";
import { responseMapping } from "../mappings/responseMapping.js";
import { pagination } from "../../persistence/pagination.js";
import { pageParams, calculateParams } from "../../domain/pageParams.js";
import { userDtoMapping } from "../mappings/userDtoMapping.js";

const usersQuery = async (req, res, next) => {
  calculateParams(req)

  let paginationUsers = await pagination(usersCollection, {}, pageParams)
  let dto = [...paginationUsers.rows].map((i) => userDtoMapping(i));

  let response = responseMapping(dto, paginationUsers);
  
  console.log("["+consoleDate+"] Fetching users")
  res.status(201).json(response);
};

export default usersQuery;