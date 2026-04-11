import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

    req.admin = decoded.id;

    next();

  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};