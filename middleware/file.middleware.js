import multer from 'multer';
import path from 'path';

// Set where you wan make file dey go
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure say this 'uploads' folder dey your root folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const uniqueName = `${name}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// Optional — if you wan restrict to only image or pdf
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Oga, this file type no dey allowed 😅'), false);
  }
};

// Set limit make person no upload nonsense size
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default upload;
