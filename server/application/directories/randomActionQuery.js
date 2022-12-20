import { actions } from "../../persistence/data/utils.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";

const randomActionQuery = async (req, res, next) => {
  var action = actions[Math.floor(Math.random() * actions .length)];
  let response = responseObjectMapping(action);
  
  console.log("["+new Date().toLocaleString()+"] Fetching random action")
  res.status(200).json(response);
};

export default randomActionQuery;