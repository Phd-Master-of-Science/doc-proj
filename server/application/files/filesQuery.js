import { consoleDate } from "../../persistence/data/utils.js";
import { filesCollection } from "../../persistence/context.js";
import { responseMapping } from "../mappings/responseMapping.js";
import { pagination } from "../../persistence/pagination.js";
import { pageParams, calculateParams } from "../../domain/pageParams.js";
import { fileDtoMapping } from "../mappings/fileDtoMapping.js";

const filesQuery = async (req, res, next) => {
  calculateParams(req);

  let paginationFiles = await pagination(filesCollection, {}, pageParams)
  let dto = [...paginationFiles.rows].map((i) => fileDtoMapping(i));

  let response = responseMapping(dto, paginationFiles);
  
  console.log("["+consoleDate+"] Fetching files")
  res.status(201).json(response);
};

export default filesQuery;