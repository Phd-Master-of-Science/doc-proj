import {
  directoriesCollection,
  documentsCollection,
  seedingsCollection,
} from "../../context.js";

export const seedingDirectories = async () => {
  const start = new Date();
  let count = await documentsCollection.countDocuments()
  console.log(count)

  let directoriesRows = 0;

  for (let d = 0; d < count; d=(d+ (count/1000))) {
    console.log("\t\td = "+d)
    console.log("\t\tcounter = "+(d+ (count/1000)))
    let documents = await documentsCollection.find({}).skip(d).limit((count/1000) -1).toArray();
    let i = 0;
    documents.forEach(async (document) => {
      let currentVersion = document.Versions[document.Versions.length - 1];
      console.log("currentVersion = "+currentVersion.Current+", documentId = "+document._id)
  
      let directories = [];
      currentVersion.Editors.forEach(async (editor) => {
        let directory = {
          DocumentId: document._id,
          UserId: editor.User._id,
          Title: currentVersion.Title,
          LastUpdate: currentVersion.LastUpdate.Date,
          Category: currentVersion.Action,
          FirstEditor: editor.User.Name,
          Publisher: editor.User.Email
        };
        directories.push(directory);
      });
  
      let resultDirectories = await directoriesCollection.insertMany(directories);
      if (resultDirectories.acknowledged)
        console.log("["+new Date().toLocaleString()+"] Directory successful insertion, count = " + resultDirectories.insertedCount);
    
      directoriesRows+= resultDirectories.insertedCount;
      i++;
      console.log("\t (d,i) = ("+d+","+i+")");
    });
  }

  const duration = (new Date() - start)/60000;

  const seed = { 
    Action: "Directories seeding",
    Rows: directoriesRows,
    Duration: `${duration} min`
  };

  await seedingsCollection.insertOne(seed)
};
