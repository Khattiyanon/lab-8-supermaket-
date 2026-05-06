-- ==============================================
-- Supermarket Inventory Management System
-- Database Setup Script
-- ==============================================

CREATE DATABASE IF NOT EXISTS supermarket_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE supermarket_db;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10, 2),
  stock INT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO products (name, category, price, stock) VALUES
('นมสด โฮมแบรนด์ 1L', 'เครื่องดื่ม', 45.00, 120),
('ข้าวหอมมะลิ 5kg', 'ธัญพืช', 189.00, 50),
('น้ำมันพืชตรามือ 1L', 'เครื่องปรุง', 68.00, 75),
('ไข่ไก่ (แผง 30 ฟอง)', 'โปรตีน', 115.00, 0),
('มาม่า รสหมู 5 ซอง', 'อาหารสำเร็จรูป', 20.00, 300),
('น้ำดื่มสิงห์ 1.5L', 'เครื่องดื่ม', 12.00, 200);
