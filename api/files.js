//import express
import express from "express";

//import db functions from /db/queries/files
import { getFiles } from "../db/files.js";

//create express router
const router = express.Router();

// GET /files
router.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.send(files);
  } catch (error) {
    next(error);
  }
});

//export express router
export default router;
