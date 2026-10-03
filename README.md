# ⚡ BRUTAL.CO — Neo-Brutalist Full-Stack E-Commerce Platform

> **The Anti-Boring Marketplace.** Radical streetwear, tactile retro tech, and heavy-duty collectibles built with an uncompromising **Neo-Brutalism** aesthetic.

![Neo-Brutalism](https://img.shields.io/badge/Design-Neo--Brutalism-FFE600?style=for-the-badge&logoColor=black)
![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-00F0FF?style=for-the-badge&logo=react&logoColor=black)
![Node Express](https://img.shields.io/badge/Backend-Node%20%2B%20Express-B8FF00?style=for-the-badge&logo=node.js&logoColor=black)
![Mongoose](https://img.shields.io/badge/Database-Mongoose%20ODM-FF4365?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🎨 Neo-Brutalist Visual Philosophy

- **High-Voltage Contrast:** Electric Yellow (`#FFE600`), Cyber Pink (`#FF4365`), Acid Lime (`#B8FF00`), Cyan (`#00F0FF`), and Pitch Black (`#121212`) set on a warm retro paper canvas (`#FDFBF7`).
- **Tactile Hard Shadows:** Distinct unblurred `4px`, `6px`, and `8px` drop shadows with reactive physical button displacement (`translate(-2px, -2px)` on hover, `translate(1px, 1px)` on active click).
- **Industrial Accents:** Barcode strips, stamp tags, starburst icons (`★ ⚡ ✦ ✖ ✹`), ticker tapes, and raw monospace specifications.
- **Micro-Interactions & Animations:** Infinite marquee tickers, bouncy notification toasts, cart slide-over drawer, quick-view detail modal, and confetti explosion upon order confirmation.

---

## 🚀 Tech Stack

### Frontend (Client)
- **React 18** with functional components & modern hooks
- **Vite 6** for blazing fast compilation and Hot Module Replacement
- **Tailwind CSS** configured with custom Neo-Brutalist design tokens and shadows
- **Lucide Icons** for crisp, geometric iconography
- **Canvas Confetti** for celebratory order dispatch reactions
- **Context API State Management:**
  - `CartContext` (Cart storage, item stepper, dynamic free shipping calculation, coupon logic)
  - `WishlistContext` (Favorites bookmarking with persistence)
  - `ToastContext` (Color-coded chunky notification alerts)

### Backend (Server)
- **Node.js** & **Express**
- **Mongoose ODM** with schemas for `Product`, `Order`, `Coupon`, and embedded reviews
- **Hybrid Zero-Setup Engine:**
  - Connects seamlessly to MongoDB daemon via `MONGODB_URI`
  - Automatically falls back to an in-memory replica if MongoDB is not running locally, ensuring 100% operational uptime out of the box with zero errors!
- **RESTful Endpoints:**
  - Full product querying with live filtering, category tags, search, and sorting
  - Real-time customer review submissions with average rating recalculation
  - Dynamic coupon validation (`BRUTAL20`, `FREESHIP`, `CHAOS10`)
  - Full order processing, inventory reduction, and parcel tracking

---

## 📦 Project Structure

```
TRY---ERROR/
├── package.json              # Root scripts (run concurrently client & server)
├── server/
│   ├── package.json
│   ├── server.js             # Express API entry point & static server
│   ├── config/
│   │   └── db.js             # Mongoose connection & auto-seeding
│   ├── models/
│   │   ├── Product.js        # Mongoose Product Schema & virtuals
│   │   ├── Order.js          # Mongoose Order Schema
│   │   └── Coupon.js         # Mongoose Coupon Schema
│   ├── routes/
│   │   ├── productRoutes.js  # /api/products, /api/products/categories
│   │   ├── orderRoutes.js    # /api/orders, /api/orders/:id
│   │   └── couponRoutes.js   # /api/coupons/validate
│   ├── services/
│   │   └── storeService.js   # Data abstraction layer (Mongoose + In-Memory)
│   └── data/
│       └── products.js       # Seed dataset (12 curated heavy items)
└── client/
    ├── package.json
    ├── vite.config.js        # Vite + API Proxy
    ├── tailwind.config.js    # Neo-brutalist theme colors & shadows
    ├── index.html            # Google Fonts (Space Grotesk & Space Mono)
    └── src/
        ├── index.css         # Custom neo-* CSS classes & scrollbars
        ├── main.jsx          # Providers & Root Mount
        ├── App.jsx           # Main Application Layout
        ├── services/
        │   └── api.js        # Frontend API client
        ├── context/
        │   ├── CartContext.jsx
        │   ├── WishlistContext.jsx
        │   └── ToastContext.jsx
        └── components/
            ├── Navbar.jsx            # Sticky brutalist navigation
            ├── MarqueeBanner.jsx     # Dual-speed infinite tickers
            ├── Hero.jsx              # High-contrast hero showcase & promo copy
            ├── FeaturedDrops.jsx     # Limited release grid
            ├── ProductFilters.jsx    # Category pills, stock switch & sorting
            ├── ProductCard.jsx       # Interactive product cards with badges
            ├── ProductDetailModal.jsx# Gallery, specs, size/color picker, reviews
            ├── CartDrawer.jsx        # Slide-over cart with free shipping meter
            ├── CheckoutModal.jsx     # Multi-step checkout with simulated card
            ├── OrderSuccessModal.jsx # Confetti, tracking number & receipt
            ├── OrderTrackerModal.jsx # Live simulated tracking radar
            ├── WishlistDrawer.jsx    # Bookmarked items drawer
            ├── Manifesto.jsx         # Brand ethos and design pillars
            ├── Toast.jsx             # Chunky notification alerts
            └── Footer.jsx            # Newsletter dispatch & links
```

## 🔐 Environment Variables (.env) Setup

We provide pre-configured `.env` and `.env.example` files for both frontend and backend.

### 1. Server Environment (`server/.env`)
```ini
# Express Server Port
PORT=5000

# Environment mode
NODE_ENV=development

# MongoDB Connection String (Atlas URI or local daemon)
# (Zero-Setup In-Memory mode engages automatically if no daemon is running)
MONGODB_URI=mongodb://127.0.0.1:27017/neobrutal_shop

# Allowed Frontend URL for CORS
CLIENT_URL=http://localhost:3000
```

### 2. Client Environment (`client/.env`)
> 💡 **Important:** In Vite + React, any variable that the browser can see **must** start with `VITE_`.

```ini
# Backend API Base URL
# Points React directly to Express on port 5000:
VITE_API_URL=http://localhost:5000/api

# Store Brand Name
VITE_STORE_NAME=BRUTAL.CO
```

### 🔄 How the Client Connects to the Backend:
In [`client/src/services/api.js`](file:///c:/Users/itsme/LearnNewAllStack/Projects/EditPro/TRY---ERROR/client/src/services/api.js):
```javascript
// Reads from client/.env via Vite's import.meta.env
const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Example: Fetching all products sends a GET request to:
// http://localhost:5000/api/products
const res = await fetch(`${API_BASE}/products`);
```

---

## ⚡ Quick Start

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(Or run `npm install` inside both `server` and `client`)*

### 2. Launch Development Servers
Run concurrently with one command:
```bash
npm run dev
```

- **Frontend Application:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🏷️ Test Promo Codes
Try applying these promo codes directly in the Shopping Cart:

| Promo Code | Discount | Minimum Order |
|---|---|---|
| `BRUTAL20` | **20% OFF** Storewide | $40 |
| `FREESHIP` | **$15 OFF** Shipping Credit | $50 |
| `CHAOS10` | **10% OFF** | No Minimum |

---

## 📋 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and database connection mode |
| `GET` | `/api/products` | Retrieve catalog (supports `search`, `category`, `sort`, `inStock`) |
| `GET` | `/api/products/featured` | Retrieve featured products |
| `GET` | `/api/products/categories` | Distinct categories with item counts |
| `GET` | `/api/products/:idOrSlug` | Detailed product by slug or ID |
| `POST` | `/api/products/:idOrSlug/reviews`| Post a customer review & recalculate score |
| `POST` | `/api/coupons/validate` | Verify coupon and compute discount |
| `POST` | `/api/orders` | Place order, reduce inventory, issue tracking code |
| `GET` | `/api/orders/:orderId` | Query order details and transit status |

---

*Crafted with high voltage for daring builders.*
