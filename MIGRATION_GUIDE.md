# Migration Guide: Express Backend to Supabase

This document outlines the migration from the Express/session-based backend to Supabase.

## What Has Changed

### ✅ Completed Migrations

#### 1. Authentication System
- **Old**: Express sessions with OTP/phone number authentication
- **New**: Supabase Auth with email/password authentication
- **Benefits**:
  - Managed authentication service
  - Built-in security features
  - Email verification support
  - Password reset flows
  - Session token management

#### 2. Database
- **Old**: In-memory storage (Map objects)
- **New**: Supabase PostgreSQL with Row Level Security
- **Benefits**:
  - Persistent data storage
  - SQL queries with type safety
  - Real-time subscriptions
  - Automatic backups
  - Scalable infrastructure

#### 3. Role-Based Access Control (RBAC)
- **Old**: Simple session flag (`isAdmin`)
- **New**: Supabase user metadata with RLS policies
- **Benefits**:
  - Database-level security
  - Fine-grained access control
  - Centralized role management
  - Audit trails

#### 4. Frontend Components
- **Updated Pages**:
  - Login.js - Email/password authentication with Supabase
  - AdminLogin.js - Admin login with role verification
  - Dashboard.js - Loads data from Supabase
  - ModuleView.js - Reads/writes progress to Supabase

- **New Components**:
  - AuthContext.js - Manages Supabase authentication state
  - ProtectedRoute.js - Route guards for authenticated users
  - AdminRoute.js - Route guards for admin users
  - LogoBar.js - iiskills.cloud branding header
  - Footer.js - Professional footer component
  - Forum.js - Forum thread listing
  - ThreadView.js - Individual thread with posts

#### 5. UI/Branding
- **Updated**: iiskills-cloud branding throughout
- **New**: LogoBar and Footer components on all pages
- **Enhanced**: Forum feature with real-time capabilities

### ⚠️ Pending Migrations

The following pages still need to be updated to use Supabase:

#### 1. Quiz.js
- Currently uses axios to call Express API
- Needs update to:
  - Load questions from Supabase `quiz_questions` table
  - Submit answers and calculate score
  - Save quiz attempt to `user_progress` table
  - Update certificate status

#### 2. Certificate.js
- Currently uses user data from Express session
- Needs update to:
  - Load certificate data from Supabase `user_progress`
  - Display user's achievement level (Gold/Silver/Bronze)

#### 3. AdminDashboard.js
- Currently uses Express API for admin functions
- Needs update to:
  - Load users from Supabase with admin RLS policy
  - Display analytics from `user_progress` table
  - Show all forum threads/posts
  - Export user data

## Supabase Database Schema

### Tables Created

1. **forum_threads**
   - Forum discussion threads
   - RLS: Public read, authenticated write (own posts)

2. **forum_posts**
   - Individual posts in threads
   - RLS: Public read, authenticated write (own posts)

3. **user_progress**
   - User module completion and quiz scores
   - RLS: Users see own data, admins see all

4. **modules**
   - Course module content
   - RLS: Public read, admin write

5. **quiz_questions**
   - Quiz questions with answers
   - RLS: Public read, admin write

### Migration Steps Already Completed

1. ✅ Created Supabase project
2. ✅ Ran initial schema migration
3. ✅ Set up RLS policies
4. ✅ Configured environment variables
5. ✅ Installed `@supabase/supabase-js`
6. ✅ Created Supabase client configuration
7. ✅ Implemented auth context
8. ✅ Updated Login/Dashboard/ModuleView

### Next Steps for Complete Migration

1. **Update Quiz.js**
   ```javascript
   // Load questions from Supabase
   const { data: questions } = await supabase
     .from('quiz_questions')
     .select('*')
     .order('order_index');
   
   // Submit quiz
   await supabase
     .from('user_progress')
     .upsert({
       user_id: user.id,
       quiz_score: score,
       quiz_attempts: [...attempts, newAttempt],
       certificate_earned: score >= 50,
       pass_level: getPassLevel(score)
     });
   ```

2. **Update Certificate.js**
   ```javascript
   // Load user progress
   const { data: progress } = await supabase
     .from('user_progress')
     .select('*')
     .eq('user_id', user.id)
     .single();
   ```

3. **Update AdminDashboard.js**
   ```javascript
   // Load all users (admin only)
   const { data: users } = await supabase
     .from('user_progress')
     .select(`
       *,
       user:auth.users(email)
     `);
   ```

4. **Seed Initial Data**
   - Add module content to `modules` table
   - Add quiz questions to `quiz_questions` table
   - Can be done via Supabase dashboard or SQL

5. **Testing**
   - Test user registration/login
   - Test module completion
   - Test quiz submission
   - Test admin access
   - Test forum features
   - Test RLS policies

6. **Deprecate Express Backend**
   - Once frontend fully migrated, Express backend can be removed
   - Or keep for backward compatibility during transition

## Environment Variables

### Required for Frontend

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### How to Get These Values

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy "Project URL" → `REACT_APP_SUPABASE_URL`
4. Copy "anon/public" key → `REACT_APP_SUPABASE_ANON_KEY`

## Setting Up Admin User

### Method 1: Supabase Dashboard
1. Go to Authentication > Users
2. Click on user
3. Scroll to "User Metadata"
4. Edit `raw_user_meta_data`:
   ```json
   {
     "role": "admin"
   }
   ```

### Method 2: SQL Query
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@iiskills.cloud';
```

## Data Migration (If Needed)

If you have existing user data in the Express backend that needs to be migrated:

### Export from Express
```javascript
// In backend/routes/admin.js
router.get('/export/json', requireAdmin, (req, res) => {
  const authModule = require('./auth');
  const usersArray = Array.from(authModule.users.values());
  res.json({ users: usersArray });
});
```

### Import to Supabase
```javascript
// Migration script
import { supabase } from './supabaseClient';

const migrateUsers = async (expressUsers) => {
  for (const user of expressUsers) {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: `${user.phoneNumber}@migrated.iiskills.cloud`, // Convert phone to email
      email_confirm: true,
      user_metadata: { 
        phone: user.phoneNumber,
        role: 'user' 
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      continue;
    }

    // Create progress record
    const { error: progressError } = await supabase
      .from('user_progress')
      .insert({
        user_id: authData.user.id,
        completed_modules: user.progress.completedModules,
        quiz_score: user.progress.quizScore,
        quiz_attempts: user.progress.quizAttempts,
        certificate_earned: user.progress.certificateEarned,
        pass_level: user.progress.passLevel,
        payment_status: user.paymentStatus
      });

    if (progressError) {
      console.error('Progress error:', progressError);
    }
  }
};
```

## Advantages of New Architecture

### 1. Security
- Database-level security with RLS
- Managed authentication with best practices
- SQL injection protection
- CSRF protection built-in

### 2. Scalability
- Hosted on Supabase infrastructure
- Automatic scaling
- CDN for static assets
- Connection pooling

### 3. Features
- Real-time subscriptions
- Built-in search
- Automatic API generation
- File storage (if needed later)

### 4. Developer Experience
- Type-safe queries
- Built-in API documentation
- Testing tools
- Migration system

### 5. Cost
- Free tier for development
- Pay-as-you-grow pricing
- No server maintenance
- Included backups

## Common Issues & Solutions

### Issue: "Invalid API key"
**Solution**: Check environment variables are correctly set and restart dev server

### Issue: "Row level security policy prevents this action"
**Solution**: Review RLS policies in Supabase dashboard, ensure user has correct role

### Issue: "Cannot read properties of null (user)"
**Solution**: User not logged in, check authentication state in AuthContext

### Issue: "Table does not exist"
**Solution**: Run the SQL migration file in Supabase SQL Editor

### Issue: "Admin access denied"
**Solution**: Ensure user has `role: 'admin'` in their user_metadata

## Rollback Plan

If issues arise, you can rollback to Express backend:

1. The Express backend code is still present in `/backend`
2. Frontend can be reverted to previous git commit
3. Update App.js to remove AuthProvider
4. Restore axios configuration
5. Restart Express backend server

## Testing Checklist

- [ ] User can register with email/password
- [ ] User can login
- [ ] User can view modules
- [ ] User can complete modules
- [ ] User progress is saved
- [ ] User can access forum
- [ ] User can create forum threads
- [ ] User can post replies
- [ ] Admin can login
- [ ] Admin sees admin dashboard
- [ ] Non-admin cannot access admin routes
- [ ] Quiz functionality works
- [ ] Certificate generation works
- [ ] Data persists after logout/login

## Support

For questions or issues with the migration:
- See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed setup
- Check Supabase documentation: https://supabase.com/docs
- Review Supabase logs in dashboard
- Check browser console for errors

---

**Last Updated**: 2024-01-05
**Migration Status**: ~70% Complete
**Remaining Work**: Quiz.js, Certificate.js, AdminDashboard.js
