/**
 * PUTHAKHUN99 - Firebase Setup Script
 * 
 * This script helps you:
 * 1. Set up Firestore Rules
 * 2. Create Collections structure
 * 3. Add sample data
 * 
 * Usage:
 * 1. Go to Firebase Console: https://console.firebase.google.com
 * 2. Open Firestore Database
 * 3. Copy and paste Firestore Rules (see below)
 * 4. Run this script in browser console (after updating Firebase config)
 */

// ============================================
// FIRESTORE SECURITY RULES
// ============================================
// Go to: Firebase Console > Firestore > Rules tab
// Replace all content with the rules below:

/*
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read, create, update: if request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow delete: if request.auth.uid == userId;
    }

    // Products collection (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Carts collection
    match /carts/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }

    // Bookings collection
    match /bookings/{bookingId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }

    // Transactions collection
    match /transactions/{transactionId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }

    // Admin collection
    match /admin/{adminId} {
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
*/

// ============================================
// SAMPLE DATA STRUCTURE
// ============================================

const sampleData = {
  users: [
    {
      email: "admin@puthakhun99.com",
      role: "admin",
      wallet: 10000,
      createdAt: new Date(),
      status: "active"
    },
    {
      email: "customer1@example.com",
      role: "customer",
      wallet: 5000,
      createdAt: new Date(),
      status: "active"
    },
    {
      email: "customer2@example.com",
      role: "customer",
      wallet: 3000,
      createdAt: new Date(),
      status: "active"
    }
  ],

  products: [
    {
      name: "iPhone 15 Pro",
      description: "สมาร์ทโฟนเรือธงจาก Apple",
      price: 39999,
      quantity: 50,
      category: "electronics",
      image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Samsung Galaxy S24",
      description: "โทรศัพท์ยอดนิยมจาก Samsung",
      price: 35999,
      quantity: 75,
      category: "electronics",
      image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "iPad Air",
      description: "แท็บเล็ตขนาด 11 นิ้ว",
      price: 22999,
      quantity: 40,
      category: "electronics",
      image: "https://via.placeholder.com/300x300?text=iPad+Air",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "AirPods Pro",
      description: "หูฟังไร้สายพร้อม Noise Cancellation",
      price: 8999,
      quantity: 100,
      category: "accessories",
      image: "https://via.placeholder.com/300x300?text=AirPods+Pro",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "MacBook Pro 14\"",
      description: "แล็ปท็อป M3 Max สำหรับการทำงาน",
      price: 79999,
      quantity: 25,
      category: "computers",
      image: "https://via.placeholder.com/300x300?text=MacBook+Pro",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Apple Watch Ultra",
      description: "นาฬิกาอัจฉริยะสำหรับนักกีฬา",
      price: 24999,
      quantity: 60,
      category: "accessories",
      image: "https://via.placeholder.com/300x300?text=Apple+Watch",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  orders: [
    {
      userId: "user1",
      items: [
        { id: "prod1", name: "iPhone 15 Pro", price: 39999, quantity: 1 }
      ],
      total: 39999,
      status: "completed",
      paymentMethod: "wallet",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],

  bookings: [
    {
      userId: "user1",
      productId: "prod1",
      quantity: 2,
      bookingDate: new Date(),
      status: "confirmed",
      notes: "รอการจัดส่ง"
    }
  ],

  transactions: [
    {
      userId: "user1",
      type: "topup",
      amount: 5000,
      description: "เติมเงิน Wallet",
      status: "completed",
      createdAt: new Date()
    },
    {
      userId: "user1",
      type: "payment",
      amount: 39999,
      description: "ซื้อสินค้า",
      status: "completed",
      createdAt: new Date()
    }
  ]
};

// ============================================
// COLLECTIONS DESCRIPTION
// ============================================

const collectionsInfo = {
  users: {
    description: "เก็บข้อมูลผู้ใช้งาน",
    fields: {
      email: "อีเมลของผู้ใช้",
      role: "บทบาท (admin/customer)",
      wallet: "ยอดเงินใน Wallet",
      createdAt: "วันที่สมัครสมาชิก",
      status: "สถานะบัญชี (active/inactive)"
    }
  },

  products: {
    description: "เก็บข้อมูลสินค้า",
    fields: {
      name: "ชื่อสินค้า",
      description: "รายละเอียดสินค้า",
      price: "ราคา",
      quantity: "จำนวนคงเหลือ",
      category: "หมวดหมู่",
      image: "URL รูปภาพ",
      createdAt: "วันที่เพิ่มสินค้า",
      updatedAt: "วันที่แก้ไขล่าสุด"
    }
  },

  carts: {
    description: "เก็บตะกร้าสินค้าของผู้ใช้",
    fields: {
      items: "รายการสินค้า",
      updatedAt: "อัปเดตครั้งล่าสุด"
    }
  },

  orders: {
    description: "เก็บคำสั่งซื้อ",
    fields: {
      userId: "ID ผู้ใช้",
      items: "รายการสินค้า",
      total: "ยอดรวม",
      status: "สถานะ (pending/completed/cancelled)",
      paymentMethod: "วิธีชำระเงิน",
      createdAt: "วันที่สั่งซื้อ",
      updatedAt: "อัปเดตครั้งล่าสุด"
    }
  },

  bookings: {
    description: "เก็บข้อมูลการจองสินค้า",
    fields: {
      userId: "ID ผู้ใช้",
      productId: "ID สินค้า",
      quantity: "จำนวน",
      bookingDate: "วันที่จอง",
      status: "สถานะ (pending/confirmed/cancelled)",
      notes: "หมายเหตุเพิ่มเติม"
    }
  },

  transactions: {
    description: "เก็บประวัติธุรกรรม",
    fields: {
      userId: "ID ผู้ใช้",
      type: "ประเภท (topup/payment/refund)",
      amount: "จำนวนเงิน",
      description: "รายละเอียด",
      status: "สถานะ (pending/completed/failed)",
      createdAt: "วันที่ทำรายการ"
    }
  }
};

// ============================================
// HELPER FUNCTION TO ADD DATA
// ============================================

async function addSampleData() {
  console.log('🚀 Starting to add sample data...');
  
  if (typeof firebase === 'undefined') {
    console.error('❌ Firebase not initialized. Please make sure Firebase SDK is loaded first.');
    return;
  }

  const db = firebase.firestore();

  try {
    // Add products
    console.log('📦 Adding products...');
    for (const product of sampleData.products) {
      await db.collection('products').add(product);
    }
    console.log('✓ Products added successfully');

    // Add sample transactions
    console.log('💳 Adding transactions...');
    for (const transaction of sampleData.transactions) {
      await db.collection('transactions').add(transaction);
    }
    console.log('✓ Transactions added successfully');

    console.log('✅ All sample data added successfully!');
  } catch (error) {
    console.error('❌ Error adding data:', error);
  }
}

// ============================================
// HOW TO USE THIS SCRIPT
// ============================================

/*
Step 1: Update Firebase Config
  - Open index.html
  - Go to https://console.firebase.google.com/project/puthakhun99/settings/general
  - Replace YOUR_API_KEY, YOUR_MESSAGING_SENDER_ID, YOUR_APP_ID with real values

Step 2: Set Firestore Rules
  - Go to https://console.firebase.google.com/project/puthakhun99/firestore/rules
  - Replace all content with the rules above (lines 12-46)

Step 3: Create Database
  - Go to https://console.firebase.google.com/project/puthakhun99/firestore
  - Click "Create database"
  - Choose "Start in test mode"
  - Select your location (Asia Southeast 1 recommended)

Step 4: Add Sample Data
  - Open Developer Console (F12)
  - Copy and paste this entire script
  - Run: addSampleData()

Step 5: Enable Authentication
  - Go to https://console.firebase.google.com/project/puthakhun99/authentication
  - Click "Get started"
  - Enable "Email/Password"

Step 6: Create Admin User
  - In the site, register with: admin@puthakhun99.com
  - In Firebase Console, go to Authentication > Users
  - Create custom claims or use Firestore to set role to 'admin'
*/

console.log('%c📋 PUTHAKHUN99 Setup Script Loaded', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('Available commands:');
console.log('  • addSampleData() - Add sample products and transactions');
console.log('  • console.log(sampleData) - View sample data');
console.log('  • console.log(collectionsInfo) - View collections structure');
