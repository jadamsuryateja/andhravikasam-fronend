# Andhra Vikasam - Quick Setup Guide

## Prerequisites
- Node.js installed
- Two terminal windows

## Step-by-Step Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Default Admin (Run Once)
```bash
npm run seed
```

Wait for the message: "Default admin user created successfully"

Default credentials:
- Username: `admin`
- Password: `admin123`
- Role: State Admin

### Step 3: Start Backend Server (Terminal 1)
```bash
npm run server
```

You should see:
```
MongoDB Atlas connected successfully
Server running on port 5000
```

### Step 4: Start Frontend (Terminal 2)
```bash
npm run dev
```

You should see:
```
VITE vX.X.X  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 5: Access the Application

**Public Website**: http://localhost:5173

**Admin Dashboard**: http://localhost:5173/admin
- Login with username: `admin` and password: `admin123`

## Testing the Application

### 1. Test Public Features
- Visit http://localhost:5173
- Navigate through Home, About, Projects, Transparency, Contact
- Fill out the "Join Us" form to test member registration

### 2. Test Admin Features
- Go to http://localhost:5173/admin
- Login with admin credentials
- View and approve/reject member applications
- If you're a Constituency Incharge, upload a project with images

### 3. Create Additional Admin Users (Optional)

To create Constituency Incharges or District Incharges:

1. Login as State Admin
2. Use the admin register endpoint (requires API tool like Postman or create a UI)

Or manually via MongoDB:
```javascript
// Example for Constituency Incharge
{
  username: "visakha_ci",
  password: <hashed>,
  role: "Constituency Incharge",
  constituency: "Visakhapatnam East"
}
```

## Key Features to Test

### Public Side
1. **Join Us Form**: Submit with different roles
2. **View Projects**: See all uploaded projects with images
3. **Transparency Dashboard**: Check real-time statistics
4. **Responsive Design**: Test on mobile view

### Admin Side
1. **Member Management**: Approve/reject applications (District Incharge, State Admin)
2. **Project Upload**: Upload projects with multiple images (Constituency Incharge)
3. **Project Status Update**: Mark as In Progress or Solved (District Incharge, State Admin)

## Troubleshooting

### Backend Not Starting
- Check if MongoDB URI is correct in `.env`
- Ensure port 5000 is not in use

### Frontend Not Loading
- Ensure backend is running on port 5000
- Check browser console for errors

### Images Not Uploading
- Verify Cloudinary credentials in `.env`
- Check file size (should be reasonable)
- Ensure file is an image format

### Admin Can't Login
- Run `npm run seed` to create admin user
- Check MongoDB connection
- Verify credentials

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. The `dist` folder contains the production-ready frontend

3. Deploy backend and frontend separately:
   - Backend: Render, Railway, Heroku
   - Frontend: Vercel, Netlify

4. Update API URLs in frontend components to point to production backend

## Support

For issues or questions, refer to the main README.md or contact the development team.
