import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const maxSize = 5 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: (req, file, func) => {
    func(null, "static");
  },
  filename: (req, file, func) => {
    func(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  filtFilter: (req, file, func) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      func(null, true);
    } else {
      func(null, false);
      return func(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("image");

export const uploadController = (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.json({ error: err.message });
      } else if (err) {
        return res.json({ error: err.message });
      }
      if (!res.req.file) {
        return res.json({ error: "no file to upload" });
      }
      return res.send({
        imageurl: `${req.protocol}://${req.get("host")}/${res.req.file.path}`,
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
