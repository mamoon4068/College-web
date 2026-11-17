
import jwt from "jsonwebtoken";

export const createToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
      type: "school-admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};
