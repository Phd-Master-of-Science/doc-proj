import { seedingsCollection } from "../../persistence/context.js";
import { responseObjectMapping } from "../mappings/responseMapping.js";
import { seedDtoMapping } from "../mappings/commonDtoMapping.js";

const seedingsQuery = async (req, res, next) => {

  let seeding = await seedingsCollection.find({}).toArray()
  let dto = [...seeding].map((i) => seedDtoMapping(i));

  let response = responseObjectMapping(dto);
  
  console.log("["+new Date().toLocaleString()+"] Fetching seedings")
  res.status(200).json(response);
};

export default seedingsQuery;