require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandle = require("./_helpers/error-handle");
require("./db/connection");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

// api routes
app.use("/users", require("./users/user.controller"));

// global error handle
app.use(errorHandle);

app.listen(port, () => console.log(`Server is running on port ${port}`));
