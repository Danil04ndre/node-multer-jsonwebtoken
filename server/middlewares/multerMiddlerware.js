import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos JPEG y PNG."), false);
  }
};

export const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8, // Tamaño máximo del archivo (8MB)
  },
  fileFilter: fileFilter,
});
