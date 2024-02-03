import { DeleteFileParams } from "./protocols";
import { s3Client } from "../../../services/aws";
import fs from "fs";

export const DeleteFile = async (params: DeleteFileParams) => {
  const urlImage = params.url_image;
  const fileName = urlImage.split("/").pop();
  const bucketName = "insta-teste";

  const localEmptyFilePath = "./local-empty-file.txt";

  fs.writeFileSync(localEmptyFilePath, "");

  const emptyFileContent = fs.readFileSync(localEmptyFilePath);

  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: emptyFileContent,
  };

  try {
    const response = await s3Client.putObject(uploadParams);
  } catch (error) {
    return error;
  } finally {
    fs.unlinkSync(localEmptyFilePath);
  }
};
