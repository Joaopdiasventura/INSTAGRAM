import fastifyMulter from "fastify-multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import crypto from "crypto";

export const s3Client = new S3({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

interface FileWithFilename extends Express.Multer.File {
  filename: string;
}

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET,
  acl: "public-read",
  key: (
    req: any,
    file: FileWithFilename,
    cb: (error: any, key?: string) => void
  ) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        return cb(err);
      }
      const filename = `${hash.toString("hex")}-${file.originalname}`;
      cb(null, filename);
    });
  },
});

const multer = fastifyMulter({ storage: storage as any });

export const upload = multer;