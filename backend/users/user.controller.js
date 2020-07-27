const express = require("express");

const userService = require("./user.service");
const authorize = require("../_helpers/authorize");
const Role = require("../_helpers/roles");

const router = express.Router();

const register = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.email || !body.password || !body.role) {
      return res.status(400).json({ message: "Invalid parameters" });
    }
    const newUser = await userService.register(body);
    if (!newUser) {
      return next(new Error("Can't create new user"));
    }
    const loginResponse = await userService.login({
      email: body.email,
      password: body.password,
    });
    res.json(loginResponse);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const loginResponse = await userService.login(req.body);
    if (!loginResponse) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json(loginResponse);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    res.json(await userService.getUsers());
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const id = req.params.id;
    // only allow admins to access other user records
    if (currentUser.sub != id && currentUser.role != Role.Admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(await userService.getUser(id));
  } catch (error) {
    next(error);
  }
};

// routes
router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", authorize(Role.Admin), getUsers);
router.get("/getUser/:id", authorize(), getUser);

module.exports = router;
