# 🚀 PUTHAKHUN99 - E-Commerce Platform with Firebase

**A modern, responsive e-commerce platform built with Firebase, HTML5, CSS3, and JavaScript.**

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Setup & Configuration](#️-setup--configuration)
- [🚀 Deployment Guide](#-deployment-guide)
- [📊 Data Collection & Analytics](#-data-collection--analytics)
- [🔐 Security & Privacy](#-security--privacy)
- [🐛 Troubleshooting](#-troubleshooting)
- [📞 Support](#-support)

---

## 🎯 Project Overview

PUTHAKHUN99 is a full-featured e-commerce platform designed for buying and selling products online. It includes:

- **User Management**: Registration, login, and profile management
- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add/remove items, manage quantities
- **Orders**: Place and track orders
- **Wallet System**: Top-up and payment functionality
- **Admin Dashboard**: Manage products and orders
- **Real-time Data**: Firestore integration for live updates

---

## ✨ Features

### 👥 User Features
- ✅ Email/Password authentication
- ✅ User profile management
- ✅ Shopping cart with persistent storage
- ✅ Order history and tracking
- ✅ Wallet system for payments
- ✅ Booking functionality for products

### 🏪 Admin Features
- ✅ Manage products (create, edit, delete)
- ✅ View and manage orders
- ✅ User management
- ✅ Transaction history
- ✅ Analytics dashboard

### 🔧 Technical Features
- ✅ Real-time database with Firestore
- ✅ Firebase Authentication
- ✅ Cloud Storage for images
- ✅ Analytics integration
- ✅ Security rules and access control
- ✅ Responsive design (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Structure & markup |
| **CSS3** | Styling & responsive design |
| **JavaScript (ES6+)** | Interactivity & logic |
| **Firebase** | Authentication, Firestore, Storage, Analytics |
| **Vercel** | Hosting & deployment |
| **Git/GitHub** | Version control |

**Firebase Services:**
- 🔐 Authentication (Email/Password)
- 📦 Firestore (NoSQL Database)
- 📷 Cloud Storage (Image storage)
- 📊 Analytics (Event tracking)

---

## 📁 Project Structure

```
puthakhun99/
├── index.html                    # Main application file
├── package.json                  # Project metadata & scripts
├── vercel.json                   # Vercel deployment config
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── .git/                         # Git repository
```

### File Descriptions

| File | Purpose | Size |
|------|---------|------|
| `index.html` | Complete SPA application (HTML, CSS, JS) | 39KB |
| `package.json` | Project metadata, npm scripts | 709B |
| `vercel.json` | Vercel deployment configuration | 287B |
| `.gitignore` | Git ignore rules (env, node_modules, etc.) | 912B |

---

## ⚙️ Setup & Configuration

### 1️⃣ Firebase Configuration

The Firebase configuration is embedded in `index.html`. To use your own Firebase project:

1. **Get your Firebase Config:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to **Project Settings → General**
   - Copy your Web App configuration

2. **Update configuration in index.html:**
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "1:YOUR_APP_ID:web:YOUR_WEB_ID",
     measurementId: "G-YOUR_MEASUREMENT_ID"
   };
   ```

### 2️⃣ Firestore Security Rules

Set up security rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - Private data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Products - Public read
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Orders - User owned
    match /orders/{orderId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Carts - User owned
    match /carts/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Analytics Events
    match /analytics_events/{eventId} {
      allow write: if request.auth != null;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 3️⃣ Enable Firebase Features

**Authentication:**
1. Firebase Console → Authentication → Get Started
2. Enable "Email/Password" method

**Firestore Database:**
1. Firebase Console → Firestore → Create Database
2. Start in **test mode** (for development)
3. Choose location (recommended: Asia Southeast 1)

**Cloud Storage:**
1. Firebase Console → Storage → Get Started
2. Follow the default setup

**Analytics:**
1. Firebase Console → Project Settings → Analytics
2. Click "Enable Analytics"

---

## 🚀 Deployment Guide

### Option 1: Deploy with Vercel (Recommended)

#### Prerequisites
- GitHub account
- Git installed
- Vercel account (free at [vercel.com](https://vercel.com))

#### Step 1: Push to GitHub

```bash
# Navigate to project folder
cd path/to/puthakhun99

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - PUTHAKHUN99"

# Create GitHub repository at github.com/new
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/puthakhun99.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Search for `puthakhun99` and click "Import"
5. Configure:
   - **Project Name:** puthakhun99
   - **Framework:** Other (HTML/CSS/JS)
   - **Root Directory:** ./
6. Click "Deploy" and wait 1-2 minutes

#### Step 3: Access Your App

After successful deployment:
- **Default URL:** `https://puthakhun99.vercel.app`
- **Custom Domain:** Optional (set in Vercel project settings)

#### Auto Deployment
Every time you `git push` to GitHub, Vercel automatically deploys the latest changes.

### Option 2: Deploy Locally

```bash
# Install a simple HTTP server
# Python 3
python -m http.server 3000

# Or Node.js with http-server
npm install -g http-server
http-server -p 3000

# Visit http://localhost:3000
```

---

## 📊 Data Collection & Analytics

### Firestore Collections Structure

```javascript
// users - User information
{
  userId: string,                    // Firebase Auth UID
  email: string,
  role: 'admin' | 'customer',
  wallet: number,
  createdAt: timestamp,
  lastLogin: timestamp,
  status: 'active' | 'inactive'
}

// products - Product catalog
{
  productId: string,
  name: string,
  description: string,
  price: number,
  category: string,
  quantity: number,
  image: string,                     // Cloud Storage URL
  createdAt: timestamp,
  updatedAt: timestamp,
  viewCount: number
}

// orders - Purchase orders
{
  orderId: string,
  userId: string,
  items: [{ id, name, price, quantity }],
  total: number,
  status: 'pending' | 'completed' | 'cancelled',
  paymentMethod: string,
  createdAt: timestamp,
  completedAt: timestamp
}

// transactions - Payment history
{
  transactionId: string,
  userId: string,
  type: 'topup' | 'payment' | 'refund',
  amount: number,
  description: string,
  status: 'pending' | 'completed' | 'failed',
  createdAt: timestamp
}

// analytics_events - Custom tracking
{
  userId: string,
  eventName: string,                 // 'product_view', 'purchase', etc.
  eventData: object,
  timestamp: timestamp
}
```

### Tracked Events

```javascript
// User Events
firebase.analytics().logEvent('sign_up', { method: 'email' });
firebase.analytics().logEvent('login', { method: 'email' });

// E-commerce Events
firebase.analytics().logEvent('view_item', { 
  item_id: productId, 
  item_name: productName, 
  price: productPrice 
});

firebase.analytics().logEvent('add_to_cart', { 
  items: [{ item_id: productId, quantity: quantity }] 
});

firebase.analytics().logEvent('purchase', { 
  transaction_id: orderId, 
  value: totalAmount, 
  currency: 'THB' 
});

firebase.analytics().logEvent('search', { 
  search_term: searchQuery 
});
```

---

## 🔐 Security & Privacy

### Data Protection

**Data We Collect:**
- ✅ User accounts (email, hashed password via Firebase Auth)
- ✅ Purchase history
- ✅ User preferences
- ✅ Analytics events

**Data We Don't Collect:**
- ❌ Credit card information (use Payment Gateways)
- ❌ SSN or government IDs
- ❌ Medical information
- ❌ IP addresses (without consent)

### Firestore Rules

All collections are protected by security rules:
- Users can only read/write their own data
- Products are read-only for customers
- Orders are private except for admin
- Admin operations are role-based

### GDPR & Thailand PDPC Compliance

**User Rights:**
1. **Right to Access** - Users can request their data
2. **Right to Delete** - Users can delete their account
3. **Right to Correct** - Users can update their information
4. **Data Portability** - Users can export their data

**Data Retention:**
- User accounts: Until deletion request
- Orders: 3 years (tax requirement)
- Analytics: 13 months (Firebase default)

---

## 🐛 Troubleshooting

### Firebase Issues

**❌ "Firebase not initialized"**
```
✅ Solution:
1. Check Firebase config has real values
2. Ensure Firebase SDK is loaded
3. Check browser console for errors (F12)
```

**❌ "Permission denied" errors**
```
✅ Solution:
1. Review Firestore security rules
2. Ensure user is authenticated
3. Check user role/permissions
```

**❌ "Cannot read properties of undefined"**
```
✅ Solution:
1. Verify Firebase config in index.html
2. Check all fields: apiKey, projectId, authDomain
3. Use real values from Firebase Console
```

### Deployment Issues

**❌ Vercel deploy fails**
```
✅ Solution:
1. Check for syntax errors in HTML
2. Verify all script src URLs are correct
3. Ensure Firebase config is valid
4. Check build logs in Vercel dashboard
```

**❌ Features not working after deploy**
```
✅ Solution:
1. Open Developer Console (F12)
2. Check for error messages
3. Verify Firebase configuration
4. Test with real Firebase project
```

### Git Issues

**❌ "fatal: remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/puthakhun99.git
```

**❌ "authentication failed"**
```
✅ Solution:
1. Use GitHub Personal Access Token instead of password
2. Generate at: GitHub → Settings → Developer settings → Personal access tokens
3. Use token as password when prompted
```

---

## 📞 Support

### Getting Help

| Topic | Resource |
|-------|----------|
| **Firebase** | [Firebase Docs](https://firebase.google.com/docs) |
| **Vercel** | [Vercel Docs](https://vercel.com/docs) |
| **Git/GitHub** | [GitHub Docs](https://docs.github.com) |
| **HTML/CSS/JS** | [MDN Docs](https://developer.mozilla.org) |
| **Web Development** | [Stack Overflow](https://stackoverflow.com) |

### Useful Links

- 🔗 [Firebase Console](https://console.firebase.google.com)
- 🔗 [Vercel Dashboard](https://vercel.com/dashboard)
- 🔗 [GitHub](https://github.com)
- 🔗 [Project URL](https://puthakhun99.vercel.app)

---

## ✅ Deployment Checklist

- [ ] Firebase config updated with real credentials
- [ ] Firestore database created
- [ ] Security rules configured
- [ ] Authentication enabled
- [ ] Files pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Deployment successful
- [ ] All features tested
- [ ] Custom domain configured (optional)

---

## 📝 License

MIT License - Feel free to use this project for learning and commercial purposes.

---

## 🎉 Getting Started

1. **Clone/Download:** Get the project files
2. **Configure Firebase:** Update index.html with your config
3. **Test Locally:** Open index.html in browser
4. **Deploy:** Push to GitHub and deploy with Vercel
5. **Monitor:** Check analytics in Firebase Console

**Happy coding! 🚀**

---

**Last Updated:** February 3, 2026  
**Project:** PUTHAKHUN99 E-Commerce Platform  
**Version:** 1.0.0
