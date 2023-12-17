import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// import path from "path";
// import "dotenv/config";
// import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "../config/constants.js";

// Configure Cloudinary
// FIXME: set the keys env file
cloudinary.config({
  cloud_name: "dhcfqmwzc",
  api_key: "453232834664749",
  api_secret: "YAVyE5YC2VEpD2NWNpGTH6P-YPw",
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "user-images", // Cloudinary folder where images will be stored
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(undefined, file.originalname); // Use the original file name on Cloudinary
  },
});

// FIXME: filter optional
// const fileFilter = (req, file, cb) => {
//   const extname = path.extname(file.originalname);
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   if (file.size > MAX_FILE_SIZE) {
//     return cb(new Error("File size exceeds the maximum limits!"), false);
//   }
//   if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
//     return cb(new Error("File type not allowed!!"), false);
//   }
//   cb(null, true);
// };

export const upload = multer({ storage: storage });
