const jwt = require("jsonwebtoken");

const User = require("../db/models/user");
const { encryptPassword, comparePassword } = require("../_helpers/utils");
const secret = process.env.SECRET || "secret";

const register = async ({ email, password, role }) => {
  if (!email || !password || !role) {
    return null;
  }
  const hashPassword = await encryptPassword(password);
  if (!hashPassword) throw Error("Can't encrypt password");
  const newUser = new User({ email, password: hashPassword, role });
  return await newUser.save();
};

const login = async ({ email, password: loginPassword }) => {
  let user = await User.findOne({ email });
  if (!user) return null;
  // check password
  const isInvalidPassword = await comparePassword(loginPassword, user.password);
  if (!isInvalidPassword) return null;
  const token = generateToken(user._id, user.role);
  user = user.toObject();
  delete user.password;
  return { token, user };
};

const generateToken = (id, role) => {
  return jwt.sign({ sub: id, role: role }, secret, {
    expiresIn: "5m",
  });
};

const getUsers = async () => {
  return await User.find({}).select("-password -__v").exec();
};

const getUser = async (id) => {
  return await User.findOne({ _id: id }).select("-password -__v").exec();
};

module.exports = {
  generateToken,
  register,
  login,
  getUsers,
  getUser,
};
