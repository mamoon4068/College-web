
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  console.error("API Error:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "Image must be 5 MB or smaller"
          : "Invalid upload request",
    });
  }

  if (err.message === "Only JPG, PNG and WebP allowed") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
