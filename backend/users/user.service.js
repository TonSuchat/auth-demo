const User = require("../db/models/user");
const { encryptPassword, comparePassword } = require("../_helpers/utils");
const tokenService = require("../token/token.service");

const register = async ({ email, password, role }) => {
  if (!email || !password || !role) {
    return null;
  }
  const passwordHash = await encryptPassword(password);
  if (!passwordHash) throw Error("Can't encrypt password");
  const newUser = new User({ email, passwordHash, role });
  return await newUser.save();
};

const login = async ({ email, password: loginPassword }, res) => {
  let user = await User.findOne({ email });
  if (!user) return null;
  // check password
  const isInvalidPassword = await comparePassword(
    loginPassword,
    user.passwordHash,
  );
  if (!isInvalidPassword) return null;
  const token = tokenService.generateToken(user._id, user.role);
  await tokenService.setRefreshTokenCookie(user._id, res);
  user = user.toJSON();
  return { token, user };
};

const getUsers = async () => {
  return await User.find();
};

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw "User not found";
  return user;
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
};
