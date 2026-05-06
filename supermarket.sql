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
('โค้ก 1.25 ลิตร', 'เครื่องดื่ม', 38.00, 120),
('เลย์ รสโนริสาหร่าย 158 ก.', 'ขนม', 65.00, 50),
('เลย์รือครสบาร์บีคิว 180 ก.', 'ขนม', 52.00, 75),
('ไข่ไก่ (แผง 30 ฟอง)', 'โปรตีน', 126.00, 0),
('มาม่า OK รสต้มยำกุ้งน้ำข้น (แพ็ค 4 ซอง)', 'อาหารสำเร็จรูป', 60.00, 300),
('คริสตัล น้ำดื่ม 1.5 ล. x 6', 'เครื่องดื่ม', 49.00, 200);
