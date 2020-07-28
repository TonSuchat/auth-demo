const jwt = require("jsonwebtoken");
const randToken = require("rand-token");

const secret = process.env.SECRET || "secret";
const RefreshToken = require("../db/models/refreshToken");

const setRefreshTokenCookie = async (userId, res, token = null) => {
  if (!token) token = await generateRefreshToken(userId);
  res.cookie("refreshtoken", token.token, {
    expires: token.expires,
    httpOnly: true,
  });
};

const generateToken = (id, role) => {
  return jwt.sign({ sub: id, role: role }, secret, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = async (id) => {
  // create a refresh token that expires in 7 days
  return await new RefreshToken({
    user: id,
    token: randToken.uid(256),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }).save();
};

const getRefreshToken = async (token) => {
  const searchToken = await RefreshToken.findOne({ token }).populate("user");
  if (!searchToken || !searchToken.isActive) throw "Invalid token";
  return searchToken;
};

const refreshToken = async (refreshToken, userId, res) => {
  const token = await getRefreshToken(refreshToken);
  const { user } = token;
  if (user.id != userId) throw "User doesn't match the token";
  // generate new refresh token
  const newRefreshToken = await generateRefreshToken(userId);
  // revoked the previous refresh token
  token.revoked = Date.now();
  token.replacedByToken = newRefreshToken.token;
  await token.save();
  setRefreshTokenCookie(userId, res, newRefreshToken);
  // generate new jwt
  const jwtToken = generateToken(userId, user.role);
  return { token: jwtToken, user };
};

const revokeToken = async (token) => {
  const revokeToken = await getRefreshToken(token);
  if (!revokeToken) throw "Revoke token not found";
  revokeToken.revoked = Date.now();
  await revokeToken.save();
};

const getAllRefreshTokens = async (userId) => {
  if (!userId) return await RefreshToken.find();
  return await RefreshToken.find({ user });
};

module.exports = {
  setRefreshTokenCookie,
  generateToken,
  refreshToken,
  revokeToken,
  getAllRefreshTokens,
};
