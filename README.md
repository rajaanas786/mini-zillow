
#  Mini Zillow - Fullstack Property Listing Platform

A fullstack web application inspired by Zillow. Admins can login to manage property listings, while users can browse all listings with pagination and image support.

---

##  Features

-  Admin authentication (JWT-based login/register)
-  Create, Read, Update, Delete (CRUD) properties
-  Upload property images using Cloudinary
-  Paginated property listing and property detail page
-  Admin dashboard with form view and data table
-  Fully responsive UI using Tailwind CSS (via CDN)

---

##  Tech Stack

| Part      | Tech Stack                      |
|-----------|----------------------------------|
| Frontend  | React, React Router DOM, Tailwind CSS (CDN) |
| Backend   | Node.js, Express.js              |
| Database  | MongoDB (Compass / Atlas)        |
| Auth      | JWT                              |
| Image Upload | Multer + Cloudinary          |
| Deployment | Render (Backend) + Vercel (Frontend) |

---

##  Project Structure

```
mini-zillow/
│
├── mini-zillow-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── server.js
│
└── mini-zillow-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   └── App.js
```

---

## 🖥 Backend Setup

###  Prerequisites

- Node.js
- MongoDB (Local Compass or MongoDB Atlas)
- Cloudinary account

###  Setup Instructions

```bash
cd mini-zillow-backend
npm install
```

###  Create `.env` file in `mini-zillow-backend/`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mini-zillow
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### ▶️ Run Backend

```bash
node server.js
```

---

##  Frontend Setup

###  Setup Instructions

```bash
cd mini-zillow-frontend
npm install
npm start
```

> TailwindCSS is included via CDN in `public/index.html` for simplicity.

---

##  API Endpoints

###  Auth Routes

| Method | Endpoint              | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/auth/register`   | Register as admin        |
| POST   | `/api/auth/login`      | Login and get token      |

###  Property Routes

| Method | Endpoint                  | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/api/properties`         | Get all properties (paginated) |
| GET    | `/api/properties/:id`     | Get property by ID             |
| POST   | `/api/properties`         | Add property (auth required)   |
| PUT    | `/api/properties/:id`     | Update property (auth required)|
| DELETE | `/api/properties/:id`     | Delete property (auth required)|

---

##  Deployment

| Type     | Platform | URL |
|----------|----------|-----|
| Backend  | Render   | `https://your-backend.onrender.com` |
| Frontend | Vercel   | `https://your-frontend.vercel.app` |
| Database | MongoDB  | Local Compass or MongoDB Atlas |
| Images   | Cloudinary | https://cloudinary.com |

---

##  Testing APIs

You can use Postman or cURL to test API endpoints.

**Example:**
```http
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Use the received token in future requests:

```
Authorization: Bearer your_jwt_token
```

---

##  Admin Dashboard

- Admin login is required to access the dashboard.
- Admin can:
  - Add new property with image uploads
  - View all properties in a table
  - Modify or delete properties
  - Pagination included in table

---

##  Image Upload

- Upload supports multiple images
- Stored securely in Cloudinary
- First image is used as thumbnail

---

##  Troubleshooting

---



## Contributing

Feel free to fork this repo and enhance the project. PRs are welcome!


