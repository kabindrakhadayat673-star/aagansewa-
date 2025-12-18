import express from "express";
import db from "./config/db.connect.js";
import dotenv from "dotenv";
import branchrouter from "./routes/branchroutes.js";
import serviceRouter from "./routes/service.routes.js";
import siterouter from "./routes/siter.routes.js";
import staffrouter from "./routes/staff.routes.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/branch",branchrouter)
app.use("/api/service", serviceRouter)
app.use("/api/site",siterouter)
app.use("/api/staff",staffrouter)


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
