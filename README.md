# RunSphere - Marathon Management System

RunSphere is a modern Marathon Management System built with the MERN stack (MongoDB, Express, React, and Node.js). It provides an intuitive platform for both event organizers and participants to create, manage, and join marathons seamlessly.

## 🌍 Live Project
[🔗 Visit RunSphere](https://runsphere.netlify.app/)

---

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **State Management & Utilities:** LocalForage, Axios
- **Alerts & UI Enhancements:** SweetAlert2, React Icons
- **Build & Development Tools:** Vite, ESLint, PostCSS, Autoprefixer

---

## 🔥 Features

### 🖥️ Fully Responsive Design
- Optimized for mobile, tablet, and desktop views with an intuitive user experience.

### 🏃 Marathon Event Management
- Organizers can create, update, and delete marathon events with details like location, date, and distance.
- Events are dynamically listed with all necessary information.

### 🔎 Explore Marathons
- Participants can browse available marathons with a user-friendly interface.
- Each marathon displays location, title, and registration details.
- "See Details" button provides an in-depth event view.

### 🏅 User-Friendly Registration
- Simple and intuitive sign-up for marathons.
- All registrations are securely recorded and managed.

### 📊 User & Organizer Dashboard
#### **Participant Panel**
- View registered marathons.
- Manage registrations and personal event details.

#### **Organizer Panel**
- Manage created marathons.
- View participant lists and event analytics.

### 🔐 Secure Authentication System
- Email/password login and Google Sign-in.
- Firebase Authentication ensures a secure login experience.

### 🔍 Server-Side Search
- Quick lookup for specific marathon events and participants.

### 🔔 SweetAlert Notifications
- Smooth UI feedback for login, sign-up, and CRUD operations.

---

## 🛠 How to Run the Project Locally

### 1️⃣ Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (latest LTS recommended)
- **NPM or Yarn**
- **Git** (optional, but recommended)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/runsphere.git
cd runsphere
```

### 3️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 4️⃣ Start the Development Server
```sh
npm run dev
# or
yarn dev
```
The application should now be running on `http://localhost:5173/`.

### 5️⃣ Build for Production
```sh
npm run build
# or
yarn build
```

---

## 🔑 Environment Variables

Before running the project, create a `.env` file in the root directory and add the following variables:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
```

![Project Screenshot](https://raw.githubusercontent.com/pritom-roy/runSphere-client/main/runsphere.png)

