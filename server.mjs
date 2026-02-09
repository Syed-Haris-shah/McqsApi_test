import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.test.js";
import v1Route from "./Routes/testv1.Route.js";

dotenv.config();
connectDB();

console.log("ENV CHECK:", process.env.MONGO_URI);
console.log("=== ENVIRONMENT DEBUG ===");
console.log("TEST_VAR →", process.env.TEST_VAR);
console.log("MONGO_URI →", process.env.MONGO_URI);
// console.log("All env keys:", Object.keys(process.env));
// console.log("========================");

const app = express();

app.use(cors());
app.use(express.json());

// API Versioning
app.use("/testv1", v1Route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
