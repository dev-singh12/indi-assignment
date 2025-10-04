# Nested Comment System

A full-stack application implementing a nested threaded comment system with real-time functionality. Users can create, edit, delete, and reply to comments in a hierarchical structure.

## Live Demo

**Deployed Application:** [https://indi-assignment-6khs.onrender.com](https://indi-assignment-6khs.onrender.com)

## Features

- **Nested Comment Threading**: Create unlimited levels of comment replies
- **Real-time CRUD Operations**: Create, Read, Update, Delete comments
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **MongoDB Integration**: Persistent data storage with Prisma ORM
- **RESTful API**: Clean API endpoints for all comment operations
- **CORS Configuration**: Properly configured for cross-origin requests

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Prisma** - Database ORM and query builder
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling and responsive design

### Deployment
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

## Project Structure

```

├── BACKEND/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── comments.js      # Comment business logic
│   │   ├── routes/
│   │   │   └── comments.js      # API routes
│   │   └── index.js             # Server entry point
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   └── package.json
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   │   ├── comment.jsx      # Individual comment component
│   │   │   └── nested-comments.jsx # Main comment system
│   │   ├── hooks/
│   │   │   └── use-comment-tree.jsx # Comment tree logic
│   │   ├── api/
│   │   │   └── client.js        # API client configuration
│   │   └── App.jsx              # Main application component
│   └── package.json
└── README.md
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dev-singh12/indi-assignment.git
   cd indi-assignment/BACKEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the BACKEND directory:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nested-comments?retryWrites=true&w=majority"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../FRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the FRONTEND directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## API Endpoints

### Comments API (`/api/comments`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get all root-level comments with nested replies |
| POST | `/api/comments` | Create a new comment or reply |
| PATCH | `/api/comments/:id` | Update an existing comment |
| DELETE | `/api/comments/:id` | Delete a comment and its children |

### Request/Response Examples

**Create Comment:**
```json
POST /api/comments
{
  "message": "This is a great post!",
  "username": "john_doe",
  "parentId": null  // null for root comments
}
```

**Create Reply:**
```json
POST /api/comments
{
  "message": "I agree with you!",
  "username": "jane_smith",
  "parentId": "comment_id_here"
}
```

## Database Schema

```prisma
model Comment {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  message   String
  username  String
  parentId  String?   @db.ObjectId
  parent    Comment?  @relation("ParentChild", fields: [parentId], references: [id])
  children  Comment[] @relation("ParentChild")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

## Assumptions and Design Decisions

### Technical Assumptions
- **Guest User System**: Currently uses "guest" as default username for simplicity
- **MongoDB ObjectId**: Uses MongoDB's auto-generated ObjectId for comment identification
- **No Authentication**: Assumes public commenting system without user authentication
- **Cascade Deletion**: Deleting a parent comment removes all child comments

### Additional Features Implemented
- **Responsive Design**: Mobile-friendly interface with CSS Grid and Flexbox
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Loading States**: User feedback during API operations
- **Real-time Updates**: Comments refresh automatically after operations
- **Input Validation**: Client-side validation for empty comments

### Performance Considerations
- **Efficient Queries**: Prisma optimizes MongoDB queries for nested comment retrieval
- **CORS Configuration**: Restricted to specific origins for security
- **Environment Variables**: Sensitive data properly externalized

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy from main branch

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## Author

**Dev Kumar Singh**
- GitHub: [@dev-singh12](https://github.com/dev-singh12)
