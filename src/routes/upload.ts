import { Router, type Request, type Response } from 'express';
import multer from "multer";
import cloudinary from '../lib/cloudinary.ts';

const uploadRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRouter.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file!.buffer);
    });

    res.json(uploadResult);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default uploadRouter;