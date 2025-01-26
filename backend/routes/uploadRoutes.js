import express from "express";
import { upload } from "../controllers/fileUpload.js";

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      imageUrl: req.file.path, // Cloudinary URL
    });
    console.log("File uploaded successfully" + req.file)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

export default router

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, async (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {

//       ////////
//       const file = req.file;
//       const formData = new FormData();
//       formData.append('image', file.buffer, file.originalname);
//       const response = await axios.post('https://api.imgbb.com/1/upload?key=1b3342339dfa640d2142a175e0f019f4', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       const imageUrl = response.data.data.url;
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: imageUrl,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// export default router;
