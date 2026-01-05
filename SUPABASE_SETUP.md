# 🎓 iiskills.cloud - Data Science Learning Platform

A comprehensive full-stack education platform by iiskills.cloud (Indian Institute of Professional Skills Development), focused on Data Science, AI, and Machine Learning tailored for the Indian job market. Built with React frontend and Supabase backend with complete authentication, RBAC, and forum features.

## 🌟 Features

### Student Portal
- **Supabase Authentication**: Secure email/password authentication with Supabase
- **6 Comprehensive Modules**: Content-rich lessons covering:
  1. Introduction to Data Science in India
  2. Python for Data Science
  3. Statistics and Probability Fundamentals
  4. Machine Learning Fundamentals
  5. Deep Learning and Neural Networks
  6. Career Roadmap and Certification Prep
- **Interactive Quiz**: 10 India-context MCQ questions with auto-advance functionality
- **3-Tier Certification System**:
  - 🥇 **Gold** (90%+)
  - 🥈 **Silver** (70-89%)
  - 🥉 **Bronze** (50-69%)
- **Auto Certificate Generation**: Instant certificate upon passing the quiz
- **Progress Tracking**: Visual progress indicators for modules and quiz completion
- **Community Forum**: Discussion threads and posts for peer learning

### Admin Panel (`/admin`)
- **RBAC Protection**: Role-based access control with Supabase
- **Admin-only Access**: Secured with Supabase user roles
- **User Management**:
  - View all registered users
  - Search users by email
  - Filter users by certification status
  - View detailed user progress
  - Track quiz attempts and scores
- **Analytics Dashboard**: Key statistics
- **Content Management**: View and manage modules and quiz questions
- **Forum Moderation**: View all forum threads and posts

### Technical Features
- **Supabase Authentication**: Complete auth system with session management
- **Row Level Security (RLS)**: Database-level security policies
- **Real-time Subscriptions**: Live updates for forum features
- **Protected Routes**: Client-side route protection with RBAC
- **Responsive Design**: Works on desktop and mobile devices
- **iiskills.cloud Branding**: Consistent UI with LogoBar and Footer components

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

### Supabase Setup

1. **Create a Supabase Project**
   - Go to https://supabase.com and sign up/login
   - Create a new project
   - Note down your project URL and anon key from Settings > API

2. **Run Database Migrations**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy the contents of `supabase/migrations/20240101000000_initial_schema.sql`
   - Execute the SQL to create all tables and RLS policies

3. **Create an Admin User**
   - Go to Authentication > Users in your Supabase dashboard
   - Create a new user with email/password
   - Click on the user, go to "User Management" tab
   - Update the user's metadata to add admin role:
     ```json
     {
       "role": "admin"
     }
     ```
   - Or use SQL Editor:
     ```sql
     UPDATE auth.users 
     SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
     WHERE email = 'your-admin-email@example.com';
     ```

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phildass/iiskills-cloud.git
   cd iiskills-cloud
   ```

2. **Setup Environment Variables**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

5. **Access the Application**
   - **Student Portal**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **Forum**: http://localhost:3000/forum

## 📱 Usage

### For Students

1. **Register/Login**: 
   - Go to the login page
   - Register with email and password
   - Or login if you already have an account

2. **Complete Modules**:
   - Browse 6 comprehensive modules on the dashboard
   - Click on any module to read the content
   - Mark modules as completed after reading

3. **Take Quiz**:
   - Complete all 6 modules to unlock the quiz
   - Answer 10 multiple-choice questions
   - Get instant results and explanations

4. **Earn Certificate**:
   - Score 50% or above to earn a certificate
   - View and print your certificate
   - Retake the quiz to improve your grade

5. **Join Forum Discussions**:
   - Create new discussion threads
   - Reply to existing threads
   - Connect with fellow learners

### For Admins

1. **Login**: 
   - Go to http://localhost:3000/admin/login
   - Use your admin email and password
   - **Note**: User must have admin role in Supabase

2. **Manage Users**:
   - View all registered users
   - Check individual progress
   - Monitor certification rates

3. **Monitor Platform**:
   - View platform statistics
   - Review quiz questions and modules
   - Moderate forum discussions

## 🏗️ Project Structure

```
iiskills-cloud/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.js              # Shared footer component
│   │   │   ├── LogoBar.js             # iiskills.cloud branding header
│   │   │   ├── Forum.js               # Forum thread list
│   │   │   ├── ThreadView.js          # Individual thread view
│   │   │   └── ProtectedRoute.js      # RBAC route protection
│   │   ├── contexts/
│   │   │   └── AuthContext.js         # Supabase auth context
│   │   ├── lib/
│   │   │   └── supabaseClient.js      # Supabase configuration
│   │   ├── pages/
│   │   │   ├── Login.js               # Email/password login
│   │   │   ├── Dashboard.js           # Student dashboard
│   │   │   ├── ModuleView.js          # Module content viewer
│   │   │   ├── Quiz.js                # Quiz interface
│   │   │   ├── Certificate.js         # Certificate display
│   │   │   ├── AdminLogin.js          # Admin login
│   │   │   └── AdminDashboard.js      # Admin panel
│   │   ├── App.js                     # Main app with routing
│   │   ├── index.js                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── .env.example                   # Environment template
│   └── package.json
├── supabase/
│   └── migrations/
│       └── 20240101000000_initial_schema.sql  # Database schema
├── .gitignore
├── LICENSE
└── README.md
```

## 🔐 Security & RBAC

### Authentication
- Email/password authentication via Supabase
- Automatic session management and refresh
- Protected routes using AuthContext

### Role-Based Access Control (RBAC)
- **User Role**: Default for all registered users
  - Access to learning modules, quiz, and forum
  - Can create forum threads and posts
  - Can view and update own progress
  
- **Admin Role**: Set via user metadata in Supabase
  - All user permissions
  - Access to admin dashboard
  - View all user data and analytics
  - Manage content (future enhancement)

### Row Level Security (RLS)
All database tables have RLS policies:

- **forum_threads**: Public read, authenticated write (own only)
- **forum_posts**: Public read, authenticated write (own only)
- **user_progress**: Users can only access their own, admins see all
- **modules**: Public read, admin write
- **quiz_questions**: Public read, admin write

### Setting Admin Role

**Method 1: Supabase Dashboard**
1. Go to Authentication > Users
2. Click on user
3. Update raw_user_meta_data:
   ```json
   {"role": "admin"}
   ```

**Method 2: SQL**
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

## 🔌 Supabase Database Schema

### Tables

**forum_threads**
- `id` (UUID, PK)
- `title` (TEXT)
- `author` (UUID, FK to auth.users)
- `created_at`, `updated_at` (TIMESTAMP)

**forum_posts**
- `id` (UUID, PK)
- `thread_id` (UUID, FK to forum_threads)
- `content` (TEXT)
- `author` (UUID, FK to auth.users)
- `created_at`, `updated_at` (TIMESTAMP)

**user_progress**
- `id` (UUID, PK)
- `user_id` (UUID, FK to auth.users, UNIQUE)
- `completed_modules` (JSONB)
- `quiz_score` (INTEGER)
- `quiz_attempts` (JSONB)
- `certificate_earned` (BOOLEAN)
- `pass_level` (TEXT: bronze/silver/gold)
- `payment_status` (TEXT: pending/completed)
- `created_at`, `updated_at` (TIMESTAMP)

**modules**
- `id` (INTEGER, PK)
- `title`, `description`, `content` (TEXT)
- `order_index` (INTEGER)
- `created_at`, `updated_at` (TIMESTAMP)

**quiz_questions**
- `id` (UUID, PK)
- `question` (TEXT)
- `options` (JSONB array)
- `correct_answer` (INTEGER)
- `explanation` (TEXT)
- `order_index` (INTEGER)
- `created_at`, `updated_at` (TIMESTAMP)

## 🎨 UI/UX - iiskills.cloud Standards

### Branding
- **LogoBar Component**: Consistent header with iiskills.cloud and partner logos
- **Footer Component**: Professional footer with links and contact info
- **Color Theme**: Purple gradient background (#667eea to #764ba2)
- **Responsive**: Mobile-first design

### Components
- Clean card-based layouts
- Smooth transitions and hover effects
- Professional color-coded badges (Gold/Silver/Bronze)
- Accessible forms with clear validation

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Supabase JS Client (@supabase/supabase-js)
- CSS3 (custom styling)

### Backend
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Realtime (for forum updates)
- Row Level Security (RLS)

## 📝 Development Guide

### Adding New Modules
1. Insert into Supabase `modules` table
2. Update module order if needed
3. Content supports Markdown formatting

### Adding Quiz Questions
1. Insert into Supabase `quiz_questions` table
2. Options stored as JSONB array
3. Correct answer is the index (0-based)

### Customizing Roles
Edit RLS policies in Supabase to add more roles or modify permissions.

### Environment Variables
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions:
- GitHub Issues: https://github.com/phildass/iiskills-cloud/issues
- Email: info@iiskills.cloud

## 🚀 Deployment

### Vercel/Netlify (Frontend)
1. Connect your GitHub repository
2. Add environment variables (REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY)
3. Deploy

### Supabase (Backend)
- Already hosted on Supabase cloud
- Automatic backups and scaling
- Free tier available for testing

## 🔄 Migration from Old System

This platform replaces the previous Express/session-based system with:
- ✅ Supabase authentication (replaced OTP/phone auth)
- ✅ Proper database storage (replaced in-memory storage)
- ✅ RBAC with RLS (replaced simple session checks)
- ✅ Forum feature (new)
- ✅ iiskills.cloud branding (updated UI)

## 🙏 Acknowledgments

- Developed by iiskills.cloud team
- Indian Institute of Professional Skills Development
- Built for the Indian Data Science community
- Content tailored for Indian job market requirements

---

**Made with ❤️ by iiskills.cloud for aspiring Data Scientists in India**
