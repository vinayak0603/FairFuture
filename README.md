# 🎓 Fair Future — Education Consultancy & Admin Lead Portal

A state-of-the-art, high-performance web application and administrative lead management system built for **Fair Future Education Consultancy** (Kerala's premier overseas education consultancy with 18+ years of excellence and 12,000+ student visa successes).

---

## 🚀 Key Features

### 🌐 Public Web Application
- **Hero & Interactive Sections**: Smooth entrance animations, floating badge widgets, and responsive layout.
- **Dynamic Navbar with Scroll Spy**: Automatically highlights active sections (`About Us`, `Why Us`, `Our Process`, `Testimonials`) as the user scrolls. Logo click smoothly returns to the top Hero section.
- **Multi-Step Consultation Form (`/form`)**: 4-step interactive application form collecting applicant details, study goals, preferred countries, education history, budget, and timeline with real-time validation.
- **Optimized Performance**: Capped loader threshold (<800ms) ensuring instant sub-second page rendering and smooth visual transition.
- **Complete SEO & Metadata**: Full primary meta tags, Open Graph (OG), Twitter cards, and Schema.org `EducationalOrganization` JSON-LD structured data.

### 🛡️ Protected Admin Dashboard (`/admin`)
- **JWT Protection & Authentication**: Secure login system with token verification.
- **Blue-Themed Metric Cards**:
  - `Total Applications` — Dark Navy Blue (`#16243a`)
  - `Pending Review` — Deep Royal Blue (`#1e3a8a`)
  - `Contacted / Active` — Bright Sapphire Blue (`#2563eb`)
  - `Approved / Enrolled` — Vibrant Sky Blue (`#0284c7`)
- **Strict 5-Stage Lead Pipeline**: `Pending` ➔ `Contacted` ➔ `In Review` ➔ `Approved` ➔ `Closed`.
- **Search & Filtering**: Search by name, email, phone, or city; filter by status, destination country, program level, and date sort.
- **Applicant Detail Drawer**: Full view of lead data, one-click status switcher, and internal admin notes history.
- **Manual Lead Entry & CSV Export**: Add leads directly from the portal or export data into `.csv`.

---

## 🎨 Design System & Visual Tokens

### 🔤 Typography & Fonts
- **Primary Body Font**: `'Inter', system-ui, -apple-system, sans-serif` — Crisp, legible body text.
- **Heading Font**: `'Outfit', system-ui, -apple-system, sans-serif` — Modern, geometric display headings.
- **Accent Highlight Font**: `font-serif italic font-medium` — Elegant serif styling for key title phrases (e.g., *Fair Future*, *Study Abroad*, *Successful Students*).

### 🎨 Color Palette
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **Dark Background** | `#0c0f16` | Main dark background theme for homepage & hero |
| **Brand Navy** | `#16243a` | Navbar header, brand cards & primary admin headers |
| **Primary Navy Accent** | `#233d63` | Buttons, form step indicators, pill tags & borders |
| **Accent Sky Blue** | `#60a5fa` | Highlights, active icons & shiny CTA gradient borders |
| **Light Surface** | `#faf9f7` / `#f8f9fa` | Soft cream background for forms & content sections |
| **Status Card 1 (Total)** | `#16243a` | Dark Navy Blue stat card |
| **Status Card 2 (Pending)** | `#1e3a8a` | Deep Royal Blue stat card |
| **Status Card 3 (Contacted)** | `#2563eb` | Bright Sapphire Blue stat card |
| **Status Card 4 (Approved)** | `#0284c7` | Vibrant Sky Blue stat card |

---

## 📁 Project Architecture & Folder Structure

```text
GoZoop/
├── client/                     # Frontend Vite + React 19 + Tailwind v4
│   ├── public/
│   │   └── favicon.svg         # SVG Brand Favicon
│   ├── src/
│   │   ├── assets/             # Brand graphics & process images
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Scroll-spy responsive navigation
│   │   │   ├── PageLoader.jsx  # SVG fill loading overlay
│   │   │   ├── SEO.jsx         # Dynamic meta tags & OG data manager
│   │   │   └── Velaris.jsx    # Interactive 3D/Canvas component
│   │   ├── hooks/
│   │   │   └── usePageLoader.js# Optimized loading controller (<800ms)
│   │   ├── page/
│   │   │   ├── home.jsx        # Landing page with section headings
│   │   │   ├── form.jsx        # Multi-step consultation booking page
│   │   │   └── admin/
│   │   │       ├── AdminPage.jsx            # Top-level auth wrapper
│   │   │       ├── AdminLogin.jsx           # Admin login interface
│   │   │       ├── AdminDashboard.jsx       # Metrics, table & toolbar
│   │   │       ├── ApplicationDetailModal.jsx# Lead detail & notes modal
│   │   │       └── AddLeadModal.jsx         # Manual lead entry modal
│   │   ├── App.jsx             # React Router route definitions
│   │   ├── index.css           # Global Tailwind v4 design tokens & CSS
│   │   └── main.jsx            # React root entry point
│   ├── index.html              # HTML5 root with primary & OG metadata
│   ├── package.json            # Client dependencies
│   └── vite.config.js          # Vite config with API proxy settings
│
└── server/                     # Backend Node.js + Express REST API
    ├── config/
    │   └── db.js               # MongoDB connection handler
    ├── controllers/
    │   ├── adminController.js  # JWT Auth & default admin seeder
    │   └── applicationController.js # Lead CRUD & analytics controller
    ├── middleware/
    │   ├── authMiddleware.js   # JWT token protection middleware
    │   ├── errorHandler.js     # Centralized 404 & 500 error handler
    │   └── validationMiddleware.js # Express-validator sanitization
    ├── models/
    │   ├── Admin.js            # Admin user Mongoose schema (bcrypt)
    │   └── Application.js      # Lead submission Mongoose schema
    ├── routes/
    │   ├── adminRoutes.js      # Routes for /api/admin
    │   └── applicationRoutes.js# Routes for /api/applications
    ├── .env                    # Environment config (Port, Mongo URI, JWT)
    ├── package.json            # Server dependencies
    └── server.js               # Express application entry point
```

---

## 🔌 API Endpoints Summary

### 🔓 Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/applications` | Submit new consultation application |

### 🔒 Protected Admin Endpoints (`Authorization: Bearer <token>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Admin login & JWT token issuance |
| `GET` | `/api/admin/me` | Retrieve currently authenticated admin |
| `GET` | `/api/applications` | Get applications (search, filter, paginate, sort) |
| `GET` | `/api/applications/:id` | Get single application details |
| `PATCH` | `/api/applications/:id/status` | Update lead status (`Pending`, `Contacted`, etc.) |
| `POST` | `/api/applications/:id/notes` | Add internal admin comment |
| `DELETE` | `/api/applications/:id` | Delete application record |
| `GET` | `/api/applications/analytics/overview` | Fetch metric overview statistics |

---

## 🔑 Default Admin Credentials

Upon server startup, a default admin user is automatically seeded:

```text
Email: admin@fairfuture.com
Password: Admin@123456
```

---

---

## 💻 How to Run Locally

### 1. **Start the Express Backend Server**
```bash
cd server
npm start
```
*(Runs on `http://localhost:5000` & connects to MongoDB Atlas)*

### 2. **Start the Vite Client Development Server**
```bash
cd client
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## ⚡ Build for Production

```bash
cd client
npm run build
```
