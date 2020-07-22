const jwt = require("jsonwebtoken");
const Role = require("../_helpers/roles");
const secret = process.env.SECRET || "secret";

const users = [
  {
    id: 1,
    email: "admin@test.com",
    password: "admin",
    firstName: "Admin",
    lastName: "User",
    role: Role.Admin,
  },
  {
    id: 2,
    email: "user@test.com",
    password: "user",
    firstName: "Normal",
    lastName: "User",
    role: Role.User,
  },
];

const login = async ({ email, password:loginPassword }) => {
  const user = users.find((u) =>
    u.email === email && u.password === loginPassword
  );
  if (!user) return null;
  const token = jwt.sign(
    { sub: user.id, role: user.role },
    secret,
  );
  const { password, ...userWithoutPassword } = user;
  return { token, user: { ...userWithoutPassword } };
};

const getUsers = () => {
  return users.map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
};

const getUser = (id) => {
  const user = users.find((u) => u.id === +id);
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  login,
  getUsers,
  getUser,
};
