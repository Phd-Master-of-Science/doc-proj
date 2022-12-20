import { responseObjectMapping } from "../mappings/responseMapping.js";
import { actions } from "../../persistence/data/utils.js";

const actionsQuery = async (req, res, next) => {
  let response = responseObjectMapping(actions);
  
  console.log("["+new Date().toLocaleString()+"] Fetching actions")
  res.status(200).json(response);
};

export default actionsQuery;