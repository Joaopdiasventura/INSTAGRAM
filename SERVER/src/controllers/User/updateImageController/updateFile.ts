import { s3Client } from "../../../services/aws";
import crypto from "crypto";
import { promisify } from "util";
import { File } from "./protocols";

export const UpdateImage = async (fileObject: File, url_image: string) => {
  const fileName = url_image.split("/").pop();

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    Body: fileObject.buffer,
  };

  try {
    await s3Client.putObject(uploadParams);
  } catch (error) {
    return error;
  }
};

const randomBytesAsync = promisify(crypto.randomBytes);

export const AddImage = async (fileObject: File): Promise<string> => {
  const hash = await randomBytesAsync(16);
  const fileName: string = `${hash.toString("hex")}-${fileObject.originalname}`;
  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: fileObject.buffer,
      ContentType: fileObject.mimetype,
    };

    await s3Client.putObject(uploadParams);
    return `https://insta-teste.s3.us-east-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};