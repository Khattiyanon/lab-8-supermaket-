const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get('/', productController.index);
router.get('/products/new', productController.showCreate);
router.post('/products', upload.single('image'), productController.create);
router.get('/products/:id/edit', productController.showEdit);

// Method override for PUT via POST + query string ?_method=PUT
router.post('/products/:id', upload.single('image'), (req, res, next) => {
  if (req.query._method === 'PUT') {
    return productController.update(req, res, next);
  }
  next();
});

router.post('/products/:id/delete', productController.delete);

module.exports = router;
