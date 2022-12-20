import { ObjectId } from "mongodb";

import { usersCollection } from "../../persistence/context.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";
import { userByIdDtoMapping } from "../mappings/userDtoMapping.js";

const userByIdQuery = async (req, res, next) => {
  let userId = ObjectId(req.params.id);
  let user = await usersCollection.findOne({_id: userId})

  if (!user) {
    const error = new HttpError("Could not find user.", 404);
    return next(error);
  }

  let dto =  userByIdDtoMapping(user)
  let response = responseObjectMapping(dto);
  
  console.log("["+new Date().toLocaleString()+"] Fetching user")
  res.status(200).json(response);
};

export default userByIdQuery;