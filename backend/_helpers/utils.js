const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  try {
    return await bcrypt.hashSync(password, 10);
  } catch (error) {}
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
