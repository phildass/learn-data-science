# 🎓 iiskills.cloud - Data Science Learning Platform

A comprehensive full-stack education platform by iiskills.cloud (Indian Institute of Professional Skills Development), focused on Data Science, AI, and Machine Learning tailored for the Indian job market. Built with **React frontend** and **Supabase backend** featuring modern authentication, RBAC, and community forum.

## 🌟 Features

### Student Portal
- **Supabase Authentication**: Secure email/password authentication with automatic session management
- **6 Comprehensive Modules**: Content-rich lessons covering:
  1. Introduction to Data Science in India
  2. Python for Data Science
  3. Statistics and Probability Fundamentals
  4. Machine Learning Fundamentals
  5. Deep Learning and Neural Networks
  6. Career Roadmap and Certification Prep
- **Interactive Quiz**: 10 India-context MCQ questions with instant feedback
- **3-Tier Certification System**:
  - 🥇 **Gold** (90%+)
  - 🥈 **Silver** (70-89%)
  - 🥉 **Bronze** (50-69%)
- **Auto Certificate Generation**: Instant certificate upon passing the quiz
- **Progress Tracking**: Visual progress indicators stored in Supabase
- **Community Forum**: Discussion threads and posts for peer learning
- **Course Repeat**: Retake quiz to improve scores

### Admin Panel (`/admin`)
- **RBAC Protection**: Role-based access control with Supabase user metadata
- **Secure Admin Login**: Email/password with admin role verification
- **User Management**:
  - View all registered users
  - Search users by email
  - Filter users by certification status, payment status
  - View detailed user progress
  - Track quiz attempts and scores
- **Analytics Dashboard**: Platform statistics and insights
- **Content Overview**: View and manage modules and quiz questions
- **Forum Moderation**: Monitor community discussions

### Technical Features
- **Supabase Backend**: PostgreSQL database with Row Level Security (RLS)
- **Real-time Subscriptions**: Live updates for forum features
- **RESTful Supabase API**: Type-safe database queries
- **Protected Routes**: Client-side route protection with RBAC
- **Responsive Design**: Works on desktop and mobile devices
- **iiskills.cloud Branding**: Consistent UI with LogoBar and Footer components
- **Secure by Default**: Database-level security with RLS policies

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- **Supabase account** (free tier available at https://supabase.com)

### Supabase Setup

**See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed setup instructions.**

Quick steps:
1. Create a Supabase project at https://supabase.com
2. Run the SQL migration from `supabase/migrations/20240101000000_initial_schema.sql`
3. Create an admin user and set their role to 'admin' in user metadata
4. Copy your Supabase URL and anon key

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phildass/iiskills-cloud.git
   cd iiskills-cloud
   ```

2. **Setup Frontend**
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
   - Go to http://localhost:3000/login
   - Create account with email and password
   - Verify email (if email confirmation is enabled in Supabase)
   - Login with your credentials

2. **Complete Modules**:
   - Browse 6 comprehensive modules on the dashboard
   - Click on any module to read the content
   - Mark modules as completed after reading

3. **Join Forum**:
   - Click "Forum" button on dashboard
   - Create discussion threads
   - Reply to existing threads
   - Connect with fellow learners

4. **Take Quiz**:
   - Complete all 6 modules to unlock the quiz
   - Answer 10 multiple-choice questions
   - Get instant results and explanations

5. **Earn Certificate**:
   - Score 50% or above to earn a certificate
   - View and print your certificate
   - Retake the quiz to improve your grade

### For Admins

1. **Setup Admin Account**:
   - Create a user account in Supabase
   - Set role to 'admin' in user metadata (see SUPABASE_SETUP.md)

2. **Login**: 
   - Go to http://localhost:3000/admin/login
   - Use your admin email and password

3. **Manage Platform**:
   - View all users and their progress
   - Monitor platform statistics
   - Review quiz questions and modules
   - Moderate forum discussions

## 🏗️ Project Structure

```
iiskills-cloud/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.js              # Shared footer component
│   │   │   ├── LogoBar.js             # iiskills.cloud branding
│   │   │   ├── Forum.js               # Forum thread list
│   │   │   ├── ThreadView.js          # Thread view with posts
│   │   │   └── ProtectedRoute.js      # RBAC route guards
│   │   ├── contexts/
│   │   │   └── AuthContext.js         # Supabase auth context
│   │   ├── lib/
│   │   │   └── supabaseClient.js      # Supabase config
│   │   ├── pages/
│   │   │   ├── Login.js               # Email/password login
│   │   │   ├── Dashboard.js           # Student dashboard
│   │   │   ├── ModuleView.js          # Module content
│   │   │   ├── Quiz.js                # Quiz interface
│   │   │   ├── Certificate.js         # Certificate display
│   │   │   ├── AdminLogin.js          # Admin login
│   │   │   └── AdminDashboard.js      # Admin panel
│   │   ├── App.js                     # Routes & AuthProvider
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
├── supabase/
│   └── migrations/
│       └── 20240101000000_initial_schema.sql
├── backend/                            # Legacy Express backend (deprecated)
├── SUPABASE_SETUP.md                  # Detailed setup guide
├── .gitignore
├── LICENSE
└── README.md
```

## 🔐 Security & RBAC

### Authentication
- Email/password authentication via Supabase Auth
- Automatic session management and token refresh
- Protected routes using React Context

### Role-Based Access Control
- **User Role**: Default for all registered users
- **Admin Role**: Set via Supabase user metadata
- Database-level security with Row Level Security (RLS)

### Setting Admin Role
```sql
-- In Supabase SQL Editor
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

## 🛠️ Technology Stack

### Frontend
- React 18
- React Router v6
- Supabase JS Client
- CSS3 (custom styling)

### Backend
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Realtime
- Row Level Security (RLS)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions:
- GitHub Issues: https://github.com/phildass/iiskills-cloud/issues
- Email: info@iiskills.cloud

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Backend (Supabase)
- Already hosted on Supabase cloud
- Automatic backups and scaling
- Free tier available

## 🔄 Migration from Express Backend

This version replaces the previous Express/session-based system:
- ✅ Supabase Auth (replaced OTP/phone auth)
- ✅ PostgreSQL database (replaced in-memory storage)
- ✅ RBAC with RLS (replaced session-based auth)
- ✅ Forum feature (new)
- ✅ iiskills.cloud branding (updated UI)

The old Express backend is still present for reference but is deprecated.

## 🙏 Acknowledgments

- Developed by iiskills.cloud
- Indian Institute of Professional Skills Development
- Built for the Indian Data Science community

---

**Made with ❤️ by iiskills.cloud for aspiring Data Scientists in India**
