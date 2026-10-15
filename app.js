//import express
import express from "express";
//create express application
const app = express();

//routers
import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

//use a JSON body parser for all routes
app.use(express.json());

//folders routes
app.use("/folders", foldersRouter);
app.use("/files", filesRouter);

//error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

//export express application
export default app;
