const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=>{
                if (err) {
                    cb(err)
                }
                file.key = `${hash.toString("hex")}-${file.originalname}`

                cb(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: s3Client,
        bucket: "insta-teste",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=>{
                if (err) {
                    cb(err)
                }
                file.key = `${hash.toString("hex")}-${file.originalname}`

                cb(null, file.key)
            })
        }
    })
};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes.s3,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        cb(null, true);
        
    }
};