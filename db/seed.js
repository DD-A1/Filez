import { faker } from "@faker-js/faker";
//import db from client.js
import db from "./client.js";

import { createFile } from "./files.js";
import { createFolder } from "./folders.js";

//connect to the database using pg
await db.connect();

//call seedBooks function defined below
await seedTables();

//end the connection to the database
await db.end();

//log a message to the console ensuring a successing seeding
console.log("🌱 Database seeded.");

async function seedTables() {
  // Clear old seed data first
  await db.query("DELETE FROM files");
  await db.query("DELETE FROM folders");

  const folderIds = [];

  for (let i = 0; i < 3; i++) {
    const folder = await createFolder({
      name: faker.word.words(1),
    });

    folderIds.push(folder.id);
  }
  await seedFiles(folderIds);
}

async function seedFiles(folderIds) {
  for (const folderId of folderIds) {
    for (let i = 0; i < 5; i++) {
      const file = {
        name: faker.system.fileName(),
        size: faker.number.int({ min: 1, max: 100000 }),
        folder_id: folderId,
      };

      await createFile(file);
    }
  }
}
