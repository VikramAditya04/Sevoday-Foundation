import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!["image/jpeg", "image/png"].includes(file.mimetype))
      return callback(new Error("Only JPG and PNG images are allowed."));
    callback(null, true);
  },
});

export default upload;
