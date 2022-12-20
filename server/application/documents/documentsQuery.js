import { ObjectId } from "mongodb";

import HttpError from "../../domain/httpError.js";
import { actions } from "../../persistence/data/utils.js";
import { documentsCollection, usersCollection } from "../../persistence/context.js";
import { documentFilter } from "../filters/documentFilter.js";
import { documentDtoMapping } from "../mappings/documentDtoMapping.js";
import { responseMapping } from "../mappings/responseMapping.js";
import { pagination } from "../../persistence/pagination.js";
import { pageParams, calculateParams } from "../../domain/pageParams.js";

const documentsQuery = async (req, res, next) => {
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

  let filter = documentFilter(action, userId);
  let paginationDocument = await pagination(documentsCollection, filter, pageParams)
  let dto = [...paginationDocument.rows].map((i) => documentDtoMapping(i));

  let response = responseMapping(dto, paginationDocument);
  
  console.log("["+new Date().toLocaleString()+"] Fetching documents action = ("+action+") , userId = ("+userId+")")
  res.status(200).json(response);
};

export default documentsQuery;