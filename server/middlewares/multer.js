import multer from "multer";

const multerUpload = multer({
    limits: {
         fileSize: 1024 * 1024 * 2 
        } 
});

const singleAvatar = multerUpload.single("avatar");

 
export {multerUpload};
 