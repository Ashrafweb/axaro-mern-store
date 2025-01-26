import { v2 as cloudinary } from "cloudinary"
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv"
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'axaro-mern-store', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg', "svg"], // Allowed file types
    },
});

const upload = multer({ storage });

export { upload }