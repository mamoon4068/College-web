const developmentHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

function originKey(origin) {
  const url = new URL(origin);

  if (
    process.env.NODE_ENV !== "production" &&
    developmentHosts.has(url.hostname)
  ) {
    url.hostname = "localhost";
  }

  return url.origin;
}

const allowedOrigins = (
  process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean)
  .map(originKey);

export function isAllowedOrigin(origin) {
  try {
    return Boolean(origin) && allowedOrigins.includes(originKey(origin));
  } catch {
    return false;
  }
}

export function checkOrigin(req, res, next) {
  if (!isAllowedOrigin(req.get("origin"))) {
    return res.status(403).json({
      success: false,
      message: "Request origin not allowed",
    });
  }

  next();
}
