import multer from "multer";
import path from "path";
import "dotenv/config";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, UPLOAD_USER_IMG_DIR } from "../config/constants.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error("File size exceeds the maximum limits!"), false);
  }
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error("File type not allowed!!"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter });
