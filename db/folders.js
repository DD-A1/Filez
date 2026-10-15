import db from "./client.js";

/** @returns the created folder */
export async function createFolder({ name }) {
  const sql = `
        INSERT INTO folders
            (name)
        VALUES 
            ($1)
        RETURNING *
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [name]);

  return folder;
}

/** @returns all folders */
export async function getAllFolders() {
  const sql = `
    SELECT *
    FROM folders
    ORDER BY id;
  `;

  const { rows: folders } = await db.query(sql);

  return folders;
}

/** @returns a folder with its files, or undefined if not found */
export async function getFolderById(id) {
  const sql = `
    SELECT
      folders.*,
      COALESCE(
        json_agg(files ORDER BY files.id)
          FILTER (WHERE files.id IS NOT NULL),
        '[]'::json
      ) AS files
    FROM folders
    LEFT JOIN files ON files.folder_id = folders.id
    WHERE folders.id = $1
    GROUP BY folders.id;
  `;

  const {
    rows: [folder],
  } = await db.query(sql, [id]);

  return folder;
}
