const express = require("express");

const authorize = require("../_middleware/authorize");
const Role = require("../_shared/roles");
const tokenService = require("./token.service");

const router = express.Router();

const getAllRefreshTokens = async (req, res, next) => {
  try {
    res.json(await tokenService.getAllRefreshTokens(req.params.userId));
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
router.get("/getAllRefreshTokens", authorize(Role.Admin), getAllRefreshTokens);
router.post("/refreshToken", refreshToken);
router.post("/revokeToken", authorize(), revokeToken);

module.exports = router;
