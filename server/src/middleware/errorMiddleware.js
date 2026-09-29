export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found." });
}

export function errorHandler(error, req, res, next) {
  if (error.code === 11000)
    return res
      .status(409)
      .json({
        success: false,
        message: "An account with this email already exists.",
      });
  if (error.name === "MulterError" || error.message?.startsWith("Only JPG"))
    return res.status(400).json({ success: false, message: error.message });
  const status = error.statusCode || 500;
  if (process.env.NODE_ENV !== "production") console.error(error.message);
  return res
    .status(status)
    .json({
      success: false,
      message:
        status === 500 ? "An unexpected server error occurred." : error.message,
    });
}
