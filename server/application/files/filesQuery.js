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
  
  console.log("["+new Date().toLocaleString()+"] Fetching files")
  res.status(200).json(response);
};

export default filesQuery;