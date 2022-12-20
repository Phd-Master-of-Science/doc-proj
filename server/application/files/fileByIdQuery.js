import { ObjectId } from "mongodb";

import HttpError from "../../domain/httpError.js";
import { filesCollection } from "../../persistence/context.js";
import { fileDtoMapping } from "../mappings/fileDtoMapping.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";

const fileByIdQuery = async (req, res, next) => {
  let fileId = ObjectId(req.params.id);
  let file = await filesCollection.findOne({_id: fileId})

  if (!file) {
    const error = new HttpError("Could not find file.", 404);
    return next(error);
  }

  let dto = fileDtoMapping(file)
  let response = responseObjectMapping(dto);
  
  console.log("["+new Date().toLocaleString()+"] Fetching user")
  res.status(200).json(response);
};

export default fileByIdQuery;