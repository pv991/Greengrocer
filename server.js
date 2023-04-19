//main file
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import {fileURLToPath} from 'url';
//configure env
dotenv.config();

//database config
connectDB();
//esmoudle 6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest object (add functionality for exprees in this)
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api(given 2 parameter called req,res)
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/", (req, res) => {
//   send the message to server
//   res.send("<h1>Welcome to GreenGrocer</h1>");
// });

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} on port ${PORT}`.bgGreen.white
  );
});
