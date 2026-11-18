
// import multer from "multer";

// const storage = multer.memoryStorage();

// const allowedTypes = [
//   "image/jpeg",
//   "image/png",
//   "image/webp",
// ];

// const upload = multer({
//   storage,

//   limits: {
//     fileSize: 5 * 1024 * 1024,
//     files: 1,
//   },

//   fileFilter: (req, file, cb) => {
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, PNG and WebP allowed"));
//     }
//   },
// });

// export default upload;




import multer from "multer";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, PNG and WebP allowed")
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
