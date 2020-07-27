const jwt = require("express-jwt");

const User = require("../db/models/user");
const secret = process.env.SECRET || "secret";

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    jwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      const user = await User.findById(req.user.sub);
      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user.role = user.role;
      next();
    },
  ];
};

module.exports = authorize;
