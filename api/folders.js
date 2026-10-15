//import express
import express from "express";

//import db functions from /db/queries/folders
import { getAllFolders, getFolderById } from "../db/folders.js";
import { createFile } from "../db/files.js";

//create express router
const foldersRouter = express.Router();

// GET /folders
foldersRouter.route("/").get(async (req, res, next) => {
  try {
    const folders = await getAllFolders();
    res.send(folders);
  } catch (error) {
    next(error);
  }
});

// GET /folders/:id
foldersRouter.route("/:id").get(async (req, res, next) => {
  try {
    const folder = await getFolderById(req.params.id);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.send(folder);
  } catch (error) {
    next(error);
  }
});

// POST /folders/:id/files
foldersRouter.post("/:id/files", async (req, res, next) => {
  try {
    const folder = await getFolderById(req.params.id);

    if (!folder) {
      return res.status(404).send("Folder not found.");
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body required.");
    }

    const { name, size } = req.body;

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      size === undefined ||
      size === null ||
      size === "" ||
      !Number.isInteger(Number(size)) ||
      Number(size) < 0
    ) {
      return res.status(400).send("Name and size are required.");
    }

    const file = await createFile({
      name: name.trim(),
      size: Number(size),
      folder_id: folder.id,
    });

    res.status(201).send(file);
  } catch (error) {
    next(error);
  }
});

export default foldersRouter;
