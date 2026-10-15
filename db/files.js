//import the db client connection
import db from "./client.js";

/** @returns the file created according to the provided details */
export async function createFile({ name, size, folder_id }) {
  const sql = `
        INSERT INTO files
            (name, size, folder_id )
        VALUES 
            ($1, $2, $3)
        RETURNING *
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);

  return file;
}

/** @returns all files */
export async function getFiles() {
  const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id
    ORDER BY files.id;
  `;

  const { rows: files } = await db.query(sql);

  return files;
}

/**
 * @returns the file with the given id
 * @returns undefined if file with the given id does not exist
 */
export async function getFileById(id) {
  const sql = `
  SELECT *
  FROM files
  WHERE id = $1
  `;

  const {
    rows: [file],
  } = await db.query(sql, [id]);

  return file;
}
