import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dfw2wuiuv",
  api_key: "787717143247724",
  api_secret: "TRdqZ6yAqjq52uWOZXnrrIe3DxM",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
