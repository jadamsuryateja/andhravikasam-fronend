# Getting Started with Andhra Vikasam

## Quick Start (3 Steps)

### 1. Install & Seed
```bash
npm install
npm run seed
```

Wait for "Default admin user created successfully"

### 2. Start Backend (Terminal 1)
```bash
npm run server
```

### 3. Start Frontend (Terminal 2)
```bash
npm run dev
```

## Access

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
  - Username: `admin`
  - Password: `admin123`

## First Steps

1. Visit the public website and explore
2. Fill out the "Join Us" form to test registration
3. Login to admin panel at `/admin`
4. Approve the member you just created
5. If you create a Constituency Incharge admin, they can upload projects

## Key Features

### Public Users Can:
- View all projects with images
- See transparency statistics
- Join as volunteer or incharge
- Contact the team

### Admins Can:
- **Constituency Incharge**: Upload projects with images
- **District Incharge**: Approve members, update project status
- **State Admin**: Full access to everything

## Architecture

- **Frontend**: React + Tailwind CSS on port 5173
- **Backend**: Node.js + Express on port 5000
- **Database**: MongoDB Atlas (cloud)
- **Images**: Cloudinary (cloud)

## Need Help?

Read detailed documentation:
- `SETUP.md` - Complete setup guide
- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - What was built

## Important Notes

- Admin route is hidden - access via `/admin` URL
- Member applications need admin approval
- Images are uploaded to Cloudinary
- All data stored in MongoDB Atlas
- JWT tokens expire after 24 hours

Enjoy building Andhra!
