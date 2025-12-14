import express from "express";
import db from "./config/db.connect.js";
import dotenv from "dotenv";
import branchrouter from "./routes/branchroutes.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/branch",branchrouter)


const PORT = process.env.PORT;
try {
  await db.connect();
  console.log("Database connected successfully");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
