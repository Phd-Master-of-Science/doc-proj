import { ObjectId } from "mongodb";

import HttpError from "../../domain/httpError.js";
import { actions, consoleDate } from "../../persistence/data/utils.js";
import { directoriesCollection, usersCollection } from "../../persistence/context.js";
import { directoryFilter } from "../filters/directoryFilter.js";
import { directoryDtoMapping } from "../mappings/directoryDtoMapping.js";
import { responseMapping } from "../mappings/responseMapping.js";
import { pagination } from "../../persistence/pagination.js";
import { pageParams, calculateParams } from "../../domain/pageParams.js";

const directoriesQuery = async (req, res, next) => {
  let option = req.params.option;
  let userId = ObjectId(req.params.userId);

  calculateParams(req);

  let action = actions.find(i => i.toLowerCase() === option);

  if (!action) {
    const error = new HttpError("Could not find action.", 404);
    return next(error);
  }

  let user = await usersCollection.findOne({_id: userId})

  if (!user) {
    const error = new HttpError("Could not find user.", 404);
    return next(error);
  }

  let filter = directoryFilter(action, userId);
  let paginationDocument = await pagination(directoriesCollection, filter, pageParams)
  let dto = [...paginationDocument.rows].map((i) => directoryDtoMapping(i));

  let response = responseMapping(dto, paginationDocument);
  
  console.log("["+consoleDate+"] Fetching directories action = ("+action+") , userId = ("+userId+")")
  res.status(201).json(response);
};

export default directoriesQuery;