# Facebook Page Insights App

## Overview
This project is a **Full Stack React.js + Node.js application** that integrates **Facebook Login** and **Facebook Graph API** to fetch and display Page Insights.

## Features
- **Login with Facebook**
- **List Facebook Pages managed by the user**
- **Fetch Page Insights** (Total Followers, Engagement, Impressions, Reactions)
- **Select Date Range (`since` & `until`)**
- **Deployed Frontend on Vercel/Netlify**
- **Deployed Backend on Heroku/Railway**

## Tech Stack
### **Frontend**
- React.js
- Axios
- React Router
- Netlify/Vercel (Deployment)

### **Backend**
- Node.js + Express
- Axios
- Dotenv
- Railway/Heroku (Deployment)

---

## **Getting Started**

### 1. **Clone the Repository**
```sh
# Clone the repository
git clone https://github.com/your-username/fb-insights.git
cd fb-insights
```

### 2. **Set Up Backend**
```sh
cd backend
npm install
```

#### **Environment Variables (`.env` in backend)**
```
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
REDIRECT_URI=http://localhost:5000/auth/facebook/callback
```

#### **Run Backend**
```sh
node server.js
```

---

### 3. **Set Up Frontend**
```sh
cd frontend
npm install
```

#### **Environment Variables (`.env` in frontend)**
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

#### **Run Frontend**
```sh
npm start
```

---

## **Deployment**

### **Backend Deployment (Railway/Heroku)**
```sh
# Railway Deployment
git push origin main
# Heroku Deployment
heroku create fb-insights-backend
heroku config:set FACEBOOK_APP_ID=your_app_id
heroku config:set FACEBOOK_APP_SECRET=your_app_secret
heroku config:set REDIRECT_URI=https://fb-insights-backend.herokuapp.com/auth/facebook/callback
git push heroku main
```

### **Frontend Deployment (Vercel/Netlify)**
```sh
# Deploy on Vercel
git push origin main
# Set Vercel env variable: REACT_APP_BACKEND_URL=https://fb-insights-backend.onrailway.app
```

---

## **API Endpoints**
### **Authentication**
- `GET /auth/facebook` → Redirect to Facebook Login
- `GET /auth/facebook/callback` → Handle Facebook login callback

### **Facebook Data**
- `GET /facebook/pages?access_token=TOKEN` → Get list of pages
- `GET /facebook/page-insights?page_id=PAGE_ID&access_token=TOKEN&since=YYYY-MM-DD&until=YYYY-MM-DD&period=total_over_range` → Get page insights

---

## **Screenshots**

1. **Login Page**  
   ![Login Screenshot](link_to_image)

2. **Dashboard with Insights**  
   ![Dashboard Screenshot](link_to_image)

---

## **Contributing**
Feel free to submit a pull request or report issues.

---

## **License**
This project is open-source under the MIT License.

---
