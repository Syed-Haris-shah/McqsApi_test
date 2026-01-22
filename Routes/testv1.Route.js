import express from "express";
import mcqsRoute from "./mcqstest.Route.js"

const route = express.Router();

route.use('/mcqsTest', mcqsRoute)

route.get("/", (req, res) => {
  res.json({ message: "Test v1 routes working" });
});

export default route;
