import multer from "multer";
import path from "node:path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + file.originalname.split(" ").join("_");
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });

export default upload;
