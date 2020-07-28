const errorHandle = (err, _req, res, _next) => {
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    if (err.inner && err.inner.name === "TokenExpiredError") {
      return res.status(403).json({ message: err.inner.message });
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorHandle;
