const express = require("express");

const authorize = require("../_helpers/authorize");
const tokenService = require("./token.service");

const router = express.Router();

const getAllRefreshTokens = (_req, res, next) => {
  try {
    res.json(tokenService.getAllRefreshTokens());
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const refreshToken = req.cookies.refreshtoken;
    const result = await tokenService.refreshToken(refreshToken, userId, res);
    if (!result) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const revokeToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshtoken;
    if (!token) {
      return res.status(400).json({ message: "Refresh token not found" });
    }
    await tokenService.revokeToken(token);
    res.json({ message: "Revoked token" });
  } catch (error) {
    next(error);
  }
};

// routes
router.get("/getAllRefreshTokens", authorize(), getAllRefreshTokens);
router.post("/refreshToken", refreshToken);
router.post("/revokeToken", revokeToken);

module.exports = router;
