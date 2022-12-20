import { usersCollection } from "../../persistence/context.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";

const userRandomQuery = async (req, res, next) => {
  let total = await usersCollection.countDocuments();
  let random = Math.floor(Math.random()*total);

  let user = await usersCollection.find({}).skip(random).limit(1).toArray()
  let userId = user[0]._id
  let response = responseObjectMapping(userId);
  
  console.log("["+new Date().toLocaleString()+"] Fetching Random user")
  res.status(200).json(response);
};

export default userRandomQuery;