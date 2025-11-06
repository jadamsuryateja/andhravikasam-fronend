# Andhra Vikasam

A modern, transparent youth movement platform for Andhra Pradesh development.

## Features

- **Member Registration**: Join as Volunteer, Village Incharge, Mandal Incharge, Constituency Incharge, or District Incharge
- **Project Management**: Track community issues from submission to resolution
- **Admin Dashboard**: Role-based access for different levels of leadership
- **Transparency Dashboard**: Real-time statistics on members, projects, and funds
- **Image Upload**: Multiple image support using Cloudinary
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React (icons)
- Vite

### Backend
- Node.js
- Express
- MongoDB Atlas
- Cloudinary (image storage)
- JWT Authentication

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

The `.env` file is already configured with:
- MongoDB Atlas connection
- Cloudinary credentials
- JWT secret

### 3. Seed Default Admin User

```bash
npm run seed
```

This creates a default admin user:
- Username: `admin`
- Password: `admin123`
- Role: State Admin

**Important**: Change the password after first login!

### 4. Start the Backend Server

In one terminal:

```bash
npm run server
```

The backend will run on `http://localhost:5000`

### 5. Start the Frontend

In another terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### Public Access

- **Home**: View hero section and impact dashboard
- **About**: Learn about the organizational structure
- **Join Us**: Submit membership application
- **Projects**: View all community projects
- **Transparency**: See real-time statistics
- **Contact**: Get in touch

### Admin Access

Access the admin panel by navigating to: `http://localhost:5173/admin`

#### Roles & Permissions

1. **Constituency Incharge**
   - Upload new projects with multiple images
   - View all projects

2. **District Incharge**
   - Approve/reject member applications
   - Update project status (In Progress, Solved)
   - View all members and projects

3. **State Admin**
   - Full access to all features
   - Manage members and projects
   - View transparency dashboard

### Member Application Flow

1. User fills out the "Join Us" form
2. Application status: **Pending**
3. District Incharge or State Admin reviews
4. Status updated to: **Approved** or **Rejected**

### Project Upload Flow

1. Constituency Incharge uploads project with images
2. Images stored in Cloudinary
3. Project visible to public with status: **Pending**
4. District Incharge/State Admin can update to: **In Progress** or **Solved**

## Database Collections

### members
- name, role, district, mandal, village, contact, motivation
- status: pending, approved, rejected

### projects
- title, description, village, mandal, constituency
- uploadedBy, sponsor, status, images (array)
- status: Pending, In Progress, Solved

### admins
- username, password (hashed), role
- constituency (for Constituency Incharge)
- district (for District Incharge)

### funds
- memberId, name, amount, method, date

## API Endpoints

### Public
- `POST /api/members` - Submit membership application
- `GET /api/projects` - Get all projects
- `GET /api/stats` - Get transparency statistics

### Admin (Authenticated)
- `POST /api/admin/login` - Admin login
- `POST /api/projects` - Upload project (Constituency Incharge)
- `PATCH /api/projects/:id/status` - Update project status
- `GET /api/members` - Get member applications
- `PATCH /api/members/:id/status` - Approve/reject member

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Notes

- All images are stored in Cloudinary
- MongoDB Atlas is used for the database
- Admin route is hidden (accessed via `/admin` URL)
- JWT tokens expire after 24 hours
- Member applications require admin approval
