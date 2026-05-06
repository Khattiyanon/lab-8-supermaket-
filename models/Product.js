const db = require('./db');

const Product = {
  // Get all products (with optional search)
  getAll: async (search = '') => {
    if (search) {
      const [rows] = await db.query(
        'SELECT * FROM products WHERE name LIKE ? ORDER BY created_at DESC',
        [`%${search}%`]
      );
      return rows;
    }
    const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  },

  // Get single product by ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  // Create new product
  create: async (data) => {
    const { name, category, price, stock, image } = data;
    const [result] = await db.query(
      'INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)',
      [name, category, price, stock, image]
    );
    return result;
  },

  // Update product
  update: async (id, data) => {
    const { name, category, price, stock, image } = data;
    const [result] = await db.query(
      'UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?',
      [name, category, price, stock, image, id]
    );
    return result;
  },

  // Delete product
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Product;
