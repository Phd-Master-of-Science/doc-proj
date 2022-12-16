import { ObjectId } from "mongodb";

import HttpError from "../../domain/httpError.js";
import { consoleDate } from "../../persistence/data/utils.js";
import { documentsCollection } from "../../persistence/context.js";
import { documentByIdDtoMapping } from "../mappings/documentDtoMapping.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";

const documentByIdQuery = async (req, res, next) => {
  let documentId = ObjectId(req.params.id);
  let document = await documentsCollection.findOne({_id: documentId})

  if (!document) {
    const error = new HttpError ("Could not find document.", 404);
    return next(error);
  }

  let dto = documentByIdDtoMapping(document)
  let response = responseObjectMapping(dto);
  
  console.log("["+consoleDate+"] Fetching document")
  res.status(201).json(response);
};

export default documentByIdQuery;