require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const errorHandle = require("./_middleware/error-handle");
require("./db/connection");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// api routes
app.use("/users", require("./users/user.controller"));
app.use("/token", require("./token/token.controller"));

// swagger docs route
app.use("/api-docs", require("./_helpers/swagger"));

// global error handle
app.use(errorHandle);

app.listen(port, () => console.log(`Server is running on port ${port}`));
