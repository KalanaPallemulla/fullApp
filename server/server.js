import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//connect db
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

//router middleware
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on Port ${port}`));
