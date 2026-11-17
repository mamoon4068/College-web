
export function checkOrigin(req, res, next) {
  const allowed = (
    process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173"
  )
    .split(",")
    .map((url) => url.trim());

  const origin = req.get("origin");

  if (!origin || !allowed.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Request origin not allowed",
    });
  }

  next();
}
