import multer from 'multer';
import moment from 'moment';

const EmployeesAvatarsStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/avatars/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const CompaniesAvatarsStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'storage/avatars/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}---${file.originalname}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, callback: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};


export const uploadCompaniesAvatarMiddleware = multer({
  storage: CompaniesAvatarsStorage,
  fileFilter,
  limits,
});
export const uploadEmployeesAvatarMiddleware = multer({
  storage: EmployeesAvatarsStorage,
  fileFilter,
  limits,
});