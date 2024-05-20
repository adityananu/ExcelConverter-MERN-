require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./Routers/excelRoutes");
const connectDB = require("./Utils/db");
const cors = require("cors");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/home", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is connected to the port ${PORT} succesfully`);
  });
});
