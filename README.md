# 🎓 AI Cloud Enterprises - Data Science Learning Platform

A comprehensive full-stack education platform by AI Cloud Enterprises (iiskills.cloud), focused on Data Science, AI, and Machine Learning tailored for the Indian job market. This platform features a Node.js/Express backend, React frontend, and a complete admin panel.

Powered by the Indian Institute of Professional Skills Development.

## 🌟 Features

### Student Portal
- **OTP-based Authentication**: Secure login using phone number and OTP verification
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
- **Course Repeat**: Retake quiz to improve scores

### Admin Panel (`/admin`)
- **Secure Admin Login**: Username: `phil123`, Password: `phil123` (change after first login)
- **Change Password**: Update admin credentials securely
- **User Management**:
  - View all registered users
  - Search users by phone number
  - Filter users by certification status, payment status
  - View detailed user progress
  - Track quiz attempts and scores
- **Analytics Dashboard**: Key statistics including:
  - Total users
  - Paid users
  - Certified users
  - Gold/Silver/Bronze certificate distribution
- **CSV Export**: Download complete user data as CSV
- **Content Overview**: View all modules and quiz questions
- **Quiz History**: Track individual user quiz attempts with timestamps

### Technical Features
- **Session-based Authentication**: Secure session management for both users and admin
- **RESTful API**: Well-structured backend API endpoints
- **Responsive Design**: Works on desktop and mobile devices
- **In-memory Data Storage**: Easy to upgrade to database (MongoDB, PostgreSQL, etc.)
- **Automatic Data Initialization**: Auto-populates modules and quiz data on server startup if missing or invalid
- **Stub Payment/OTP Endpoints**: Ready to integrate with production services

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phildass/learn-data-science.git
   cd learn-data-science
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will run on `http://localhost:5000`
   
   **Note**: On first startup, the backend automatically checks and initializes `modules.json` and `quiz.json` with sample data if they're missing or invalid.

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:3000`

4. **Access the Application**
   - **Student Portal**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin/login

## 📱 Usage

### For Students

1. **Login**: 
   - Enter your 10-digit phone number
   - Click "Send OTP"
   - Enter the 6-digit OTP (displayed in the alert for testing)
   - Click "Verify OTP"

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

### For Admins

1. **Login**: 
   - Go to http://localhost:3000/admin/login
   - Username: `phil123`
   - Password: `phil123`
   - **Important**: Change the password after first login!

2. **Manage Users**:
   - View all registered users
   - Search and filter users
   - Check individual progress
   - Download user data as CSV

3. **Monitor Platform**:
   - View platform statistics
   - Track certification rates
   - Review quiz questions and modules

## 🏗️ Project Structure

```
learn-data-science/
├── backend/
│   ├── data/
│   │   ├── modules.json          # 6 course modules with India context
│   │   └── quiz.json              # 10 MCQ questions
│   ├── routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   ├── modules.js             # Module content endpoints
│   │   ├── quiz.js                # Quiz and certificate endpoints
│   │   └── admin.js               # Admin panel endpoints
│   ├── package.json
│   └── server.js                  # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js           # OTP login page
│   │   │   ├── Dashboard.js       # Student dashboard
│   │   │   ├── ModuleView.js      # Module content viewer
│   │   │   ├── Quiz.js            # Quiz interface
│   │   │   ├── Certificate.js     # Certificate display
│   │   │   ├── AdminLogin.js      # Admin login
│   │   │   └── AdminDashboard.js  # Admin panel
│   │   ├── App.js                 # Main React app with routing
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Global styles
│   └── package.json
├── .gitignore
├── LICENSE                        # MIT License
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /send-otp` - Send OTP to phone number
- `POST /verify-otp` - Verify OTP and login
- `POST /payment` - Process payment (stub)
- `GET /me` - Get current user info
- `POST /logout` - Logout user

### Modules (`/api/modules`)
- `GET /` - Get all modules (summary)
- `GET /:id` - Get specific module content
- `POST /:id/complete` - Mark module as completed

### Quiz (`/api/quiz`)
- `GET /questions` - Get quiz questions
- `POST /submit` - Submit quiz answers
- `GET /certificate` - Get certificate data

### Admin (`/api/admin`)
- `POST /login` - Admin login
- `POST /logout` - Admin logout
- `POST /change-password` - Change admin password
- `GET /users` - Get all users
- `GET /users/search` - Search/filter users
- `GET /users/:phoneNumber` - Get specific user details
- `GET /users/:phoneNumber/quiz-history` - Get user quiz history
- `GET /export/users` - Export users as CSV
- `GET /modules` - Get all modules (admin view)
- `GET /quiz` - Get quiz questions with answers
- `GET /stats` - Get platform statistics

## 🔐 Security Notes

### Current Implementation (Development)
- Session secret is hardcoded
- Admin credentials stored in-memory
- OTP displayed in console and alerts
- No HTTPS enforcement
- In-memory user storage

### For Production Deployment
1. **Replace stub endpoints** with production services:
   - Integrate with AI Cloud Enterprises (iiskills.cloud) for OTP service
   - Connect to real payment gateway
   
2. **Add Database**:
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Implement proper user authentication with hashed passwords
   
3. **Security Enhancements**:
   - Use environment variables for secrets
   - Enable HTTPS
   - Add rate limiting
   - Implement CSRF protection
   - Hash admin passwords with bcrypt
   
4. **Configuration**:
   - Set up proper environment variables
   - Configure production CORS settings
   - Set secure cookie flags

## 📊 Course Content Highlights

### India-Specific Context
- **Companies**: TCS, Infosys, Wipro, Flipkart, Ola, Paytm, Swiggy, Zomato
- **Locations**: Bangalore, Hyderabad, Pune, Mumbai, Delhi
- **Salary Ranges**: ₹3-6 LPA (entry) to ₹50+ LPA (senior)
- **Technologies**: Python, ML, Deep Learning, NLP for Indian languages
- **Use Cases**: IPL analysis, stock market (NSE/BSE), UPI fraud detection
- **Government Initiatives**: Digital India, NITI Aayog AI programs

### Topics Covered
1. Data Science landscape in India
2. Python programming with real Indian datasets
3. Statistics with agricultural and election data examples
4. Machine Learning algorithms with e-commerce applications
5. Deep Learning for Indian language NLP
6. Career roadmap with Indian certifications and job platforms

## 🎨 User Interface

- **Modern Design**: Clean, gradient-based UI with purple theme
- **Responsive Layout**: Works on all screen sizes
- **Interactive Elements**: Hover effects, smooth transitions
- **Progress Tracking**: Visual progress bars and badges
- **Color-coded Certificates**: Gold, Silver, Bronze badges
- **Professional Certificate**: Printable certificate with unique ID

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- express-session (session management)
- cors (CORS handling)
- body-parser (request parsing)
- json2csv (CSV export)

### Frontend
- React 18
- React Router v6 (navigation)
- Axios (HTTP requests)
- CSS3 (styling)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real payment gateway integration
- [ ] SMS OTP service integration
- [ ] Email notifications
- [ ] Video content support
- [ ] Discussion forums
- [ ] Peer-to-peer learning
- [ ] Live coding exercises
- [ ] Job board integration
- [ ] Mobile app (React Native)

## 🙏 Acknowledgments

- Developed by AI Cloud Enterprises (iiskills.cloud)
- Indian Institute of Professional Skills Development
- Built for the Indian Data Science community
- Content tailored for Indian job market requirements
- Focused on practical, industry-relevant skills

---

**Made with ❤️ by AI Cloud Enterprises for aspiring Data Scientists in India**
