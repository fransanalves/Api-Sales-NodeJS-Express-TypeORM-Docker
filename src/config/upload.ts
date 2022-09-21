import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadPath,
  storage: multer.diskStorage({
    destination: uploadPath,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};
