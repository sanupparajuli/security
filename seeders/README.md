# Database Seeders

This directory contains comprehensive seeders for the Skillsprint freelancing platform database.

## Overview

The seeders populate the database with realistic test data for all major entities:

- **Users**: 15 users (12 sellers, 1 admin, 2 buyers)
- **Gig Categories**: 12 categories covering all major freelancing services
- **Gigs**: 13 realistic service listings with detailed information
- **Orders**: 15 orders with various completion statuses
- **Reviews**: 15 reviews with ratings and feedback
- **Conversations**: 15 conversations between buyers and sellers
- **Messages**: 30 messages across different conversations
- **Order Tracking**: 15 tracking records for all orders
- **Order Updates**: 30 progress updates for various orders

## Files

- `index.js` - Main seeder that orchestrates all other seeders
- `seedGigs.js` - Seeds gig/service listings
- `seedOrders.js` - Seeds order records
- `seedReviews.js` - Seeds review and rating data
- `seedConversations.js` - Seeds conversation threads
- `seedMessages.js` - Seeds individual messages
- `seedOrderTracking.js` - Seeds order tracking records
- `seedOrderUpdates.js` - Seeds order progress updates

## Usage

### Running the Seeders

```bash
# From the api directory
npm run seed
```

### What Gets Seeded

1. **Users** (15 total)
   - 12 sellers with different specializations
   - 1 admin user
   - 2 buyer accounts

2. **Gig Categories** (12 total)
   - Graphics & Design
   - Programming & Tech
   - Digital Marketing
   - Writing & Translation
   - Video & Animation
   - Music & Audio
   - Business
   - Data
   - Photography
   - Lifestyle
   - 3D & Modeling
   - Architecture & Interior Design

3. **Gigs** (13 total)
   - React website development
   - Logo and brand identity design
   - Django web application development
   - Mobile app UI/UX design
   - React Native mobile app development
   - Content writing and SEO
   - Digital marketing strategy
   - Video editing
   - Machine learning model development
   - Custom illustrations
   - 3D modeling and game assets
   - Voice-over services

4. **Orders** (15 total)
   - Various completion percentages (0-100%)
   - Mix of completed and in-progress orders
   - Different buyers and sellers

5. **Reviews** (15 total)
   - 4-5 star ratings
   - Detailed feedback for each gig
   - Realistic customer experiences

6. **Conversations** (15 total)
   - Between buyers and sellers
   - Various read/unread statuses
   - Realistic conversation topics

7. **Messages** (30 total)
   - Multiple messages per conversation
   - Realistic communication flow
   - Project-related discussions

8. **Order Tracking** (15 total)
   - Tracking records for all orders
   - Links buyers and sellers

9. **Order Updates** (30 total)
   - Progress updates for various orders
   - Milestone completions
   - Current work status

## Test Accounts

### Admin User
- Username: `admin_user`
- Email: `admin@skillsprint.com`
- Password: `admin123`

### Buyer Accounts
- Username: `buyer1`
- Email: `buyer1@example.com`
- Password: `password123`

- Username: `buyer2`
- Email: `buyer2@example.com`
- Password: `password123`

### Seller Accounts
All sellers use `password123` as their password. Notable sellers include:

- `john_doe` - React web developer
- `sarah_smith` - Graphic designer
- `mike_wilson` - Django developer
- `emma_davis` - UI/UX designer
- `alex_chen` - React Native developer
- `lisa_brown` - Content writer
- `david_miller` - Digital marketer
- `anna_garcia` - Video editor
- `tom_lee` - Data scientist
- `sophie_taylor` - Illustrator
- `james_rodriguez` - 3D modeler
- `maria_silva` - Voice-over artist

## Data Relationships

The seeders create realistic relationships between entities:

- Orders are linked to specific gigs and users
- Reviews are connected to gigs and buyers
- Conversations link buyers and sellers
- Messages belong to specific conversations
- Order tracking and updates are linked to orders

## Notes

- All images use Unsplash URLs for realistic appearance
- Passwords are hashed using bcrypt
- Timestamps are automatically added by Mongoose
- Data is cleared before seeding to ensure clean state
- Seeding order is important: Users → Categories → Gigs → Orders → Reviews → Conversations → Messages → Tracking → Updates 