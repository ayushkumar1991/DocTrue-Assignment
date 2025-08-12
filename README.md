# 🌟 Acme Landing Page – Full Stack App

A **full-stack web application** for a company landing page with contact details, a form that stores submissions in **PostgreSQL**, a submissions table, and an open-source static map.

## 🚀 Features
- **Responsive Landing Page UI** with header, hero, and footer  
- **Contact Methods** (Phone, Email, Address) with icons  
- **Contact Form** → Saves submissions to PostgreSQL  
- **Submissions Table** to view all entries  
- **Open-Source Static Map** (OpenStreetMap/Yandex)  
- **Custom CSS Styling** for a clean, modern look  

## 🛠 Tech Stack
**Frontend:** React (Vite), HTML5, CSS3  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Icons:** Emoji / SVG  
**Map:** OpenStreetMap / Yandex Static Map  

## 📂 Project Structure
acme-landing/
├── acme-landing-frontend/ # React (Vite) SPA
└── acme-backend/ # Node.js + Express + PostgreSQL


## ⚙️ Setup
### 1️⃣ Database
```sql
CREATE DATABASE acme_landing;

CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

2️⃣ Backend
cd acme-backend
npm install
node server.js
# Runs at http://localhost:3001

3️⃣ Frontend
cd acme-frontend
npm install
npm run dev
# Runs at http://localhost:5173

🌐 API Endpoints:-
GET /api/content → Landing page content
POST /api/contact → Save form submission


