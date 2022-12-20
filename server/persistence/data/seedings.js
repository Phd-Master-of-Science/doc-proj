import { seedingDirectories } from "./seeds/seedingDirectories.js";
import { seedingDocuments } from "./seeds/seedingDocuments.js";
import { seedingUsers } from "./seeds/seedingUsers.js";
import { seedingFiles } from "./seeds/seedingFiles.js";

export async function seedings() {
  await seedingUsers();
  await seedingFiles();
  await seedingDocuments();
  await seedingDirectories();
}
