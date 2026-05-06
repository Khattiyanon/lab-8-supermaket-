#  ระบบจัดการคลังสินค้าซูเปอร์มาร์เก็ต

ระบบ CRUD สำหรับจัดการสินค้าในซูเปอร์มาร์เก็ต พัฒนาด้วย **Node.js + Express + MySQL** รูปแบบ **MVC Architecture**

---

##  Tech Stack

| ส่วน | เทคโนโลยี |
|------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL (mysql2) |
| Template Engine | EJS |
| Image Upload | Multer |
| UI Framework | Bootstrap 5 |

---

##  โครงสร้างโปรเจกต์

```
supermarket-app/
├── controllers/
│   └── productController.js   # CRUD logic ทั้งหมด
├── models/
│   ├── db.js                  # MySQL connection pool
│   └── Product.js             # Product queries
├── routes/
│   └── productRoutes.js       # Express routes + Multer
├── public/
│   └── uploads/               # โฟลเดอร์เก็บรูปสินค้า
├── views/
│   ├── index.ejs              # หน้า Dashboard
│   ├── form.ejs               # หน้าเพิ่ม/แก้ไขสินค้า
│   └── 404.ejs                # หน้า 404
├── supermarket.sql            # SQL สำหรับสร้างฐานข้อมูล
├── package.json
└── app.js                     # Entry point
```

---

##  ขั้นตอนการติดตั้ง

### 1. Clone / ดาวน์โหลดโปรเจกต์

```bash
git clone <your-repo-url>
cd supermarket-app
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่าฐานข้อมูล MySQL

```bash
# เปิด MySQL แล้วรันไฟล์ SQL
mysql -u root -p < supermarket.sql
```

หรือเปิด MySQL Workbench / phpMyAdmin แล้ว import ไฟล์ `supermarket.sql`

### 4. แก้ไข Database Config

เปิดไฟล์ `models/db.js` แล้วแก้ข้อมูลให้ตรงกับเครื่องของคุณ:

```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // ← ชื่อ user MySQL ของคุณ
  password: '',          // ← รหัสผ่าน MySQL ของคุณ
  database: 'supermarket_db'
});
```

### 5. รันโปรเจกต์

```bash
# แบบปกติ
npm start

# แบบ Development (auto-restart)
npm run dev
```
### 6. เปิดเบราว์เซอร์
```
http://localhost:3000
```
---
## ฟีเจอร์

- **Dashboard** — แสดงสินค้าทั้งหมดในรูปแบบ Grid Cards พร้อมรูปภาพ
- **ค้นหา** — ค้นหาสินค้าตามชื่อ
- **เพิ่มสินค้า** — ฟอร์มพร้อม Image Preview ก่อนอัปโหลด
- **แก้ไขสินค้า** — แสดงรูปเดิม และลบรูปเก่าอัตโนมัติเมื่ออัปโหลดใหม่
- **ลบสินค้า** — มี Modal ยืนยันก่อนลบ พร้อมลบไฟล์รูปออกจาก server
- **Out of Stock** — แสดง Badge สีแดงเมื่อสต็อก = 0
- **Success Toast** — แจ้งเตือนสีเขียวหลังดำเนินการสำเร็จ
