const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

const productController = {
  // GET / - Dashboard: list all products
  index: async (req, res) => {
    try {
      const search = req.query.search || '';
      const products = await Product.getAll(search);
      const successMsg = req.query.success || null;
      res.render('index', { products, search, successMsg });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // GET /products/new - Show create form
  showCreate: (req, res) => {
    res.render('form', { product: null, action: '/products', method: 'POST', title: 'เพิ่มสินค้าใหม่' });
  },

  // POST /products - Create product
  create: async (req, res) => {
    try {
      const { name, category, price, stock } = req.body;
      const image = req.file ? req.file.filename : null;
      await Product.create({ name, category, price, stock, image });
      res.redirect('/?success=เพิ่มสินค้าสำเร็จแล้ว!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // GET /products/:id/edit - Show edit form
  showEdit: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.render('form', {
        product,
        action: `/products/${product.id}?_method=PUT`,
        method: 'POST',
        title: 'แก้ไขสินค้า'
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // POST /products/:id (with ?_method=PUT) - Update product
  update: async (req, res) => {
    try {
      const { name, category, price, stock } = req.body;
      const product = await Product.getById(req.params.id);
      if (!product) return res.status(404).send('Product not found');

      let image = product.image;

      // If new image uploaded, delete old one
      if (req.file) {
        if (product.image) {
          const oldPath = path.join(__dirname, '../public/uploads', product.image);
          fs.unlink(oldPath, (err) => {
            if (err) console.warn('Could not delete old image:', err.message);
          });
        }
        image = req.file.filename;
      }

      await Product.update(req.params.id, { name, category, price, stock, image });
      res.redirect('/?success=อัพเดทสินค้าสำเร็จแล้ว!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // POST /products/:id/delete - Delete product
  delete: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) return res.status(404).send('Product not found');

      // Delete image file
      if (product.image) {
        const imgPath = path.join(__dirname, '../public/uploads', product.image);
        fs.unlink(imgPath, (err) => {
          if (err) console.warn('Could not delete image:', err.message);
        });
      }

      await Product.delete(req.params.id);
      res.redirect('/?success=ลบสินค้าสำเร็จแล้ว!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = productController;
