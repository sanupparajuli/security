import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import GigCategories from "../models/gigcategories.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import OrderTracking from "../models/ordertracking.model.js";
import OrderUpdates from "../models/orderupdates.model.js";

// Import individual seeders
import seedGigs from "./seedGigs.js";
import seedOrders from "./seedOrders.js";
import seedReviews from "./seedReviews.js";
import seedConversations from "./seedConversations.js";
import seedMessages from "./seedMessages.js";
import seedOrderTracking from "./seedOrderTracking.js";
import seedOrderUpdates from "./seedOrderUpdates.js";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB for seeding!");
  } catch (error) {
    console.log(error);
  }
};

// Clear all collections
const clearCollections = async () => {
  try {
    await User.deleteMany({});
    await GigCategories.deleteMany({});
    await Gig.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    await OrderTracking.deleteMany({});
    await OrderUpdates.deleteMany({});
    console.log("All collections cleared!");
  } catch (error) {
    console.log("Error clearing collections:", error);
  }
};

// Seed Users
const seedUsers = async () => {
  const users = [
    {
      username: "john_doe",
      email: "john@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume1.pdf",
      country: "United States",
      phone: "+1-555-0123",
      desc: "Experienced web developer with 5+ years in React and Node.js",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "sarah_smith",
      email: "sarah@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume2.pdf",
      country: "Canada",
      phone: "+1-555-0124",
      desc: "Creative graphic designer specializing in brand identity",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "mike_wilson",
      email: "mike@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume3.pdf",
      country: "United Kingdom",
      phone: "+44-555-0125",
      desc: "Full-stack developer with expertise in Python and Django",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "emma_davis",
      email: "emma@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume4.pdf",
      country: "Australia",
      phone: "+61-555-0126",
      desc: "UI/UX designer passionate about creating user-centered experiences",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "alex_chen",
      email: "alex@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume5.pdf",
      country: "Singapore",
      phone: "+65-555-0127",
      desc: "Mobile app developer specializing in React Native and Flutter",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "lisa_brown",
      email: "lisa@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume6.pdf",
      country: "Germany",
      phone: "+49-555-0128",
      desc: "Content writer and copywriter with 3+ years experience",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "david_miller",
      email: "david@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume7.pdf",
      country: "France",
      phone: "+33-555-0129",
      desc: "Digital marketing specialist with expertise in SEO and PPC",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "anna_garcia",
      email: "anna@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume8.pdf",
      country: "Spain",
      phone: "+34-555-0130",
      desc: "Video editor and motion graphics designer",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "tom_lee",
      email: "tom@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume9.pdf",
      country: "South Korea",
      phone: "+82-555-0131",
      desc: "Data scientist and machine learning engineer",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "sophie_taylor",
      email: "sophie@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume10.pdf",
      country: "Netherlands",
      phone: "+31-555-0132",
      desc: "Illustrator and character designer",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "james_rodriguez",
      email: "james@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume11.pdf",
      country: "Brazil",
      phone: "+55-555-0133",
      desc: "3D modeler and game developer",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "maria_silva",
      email: "maria@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      resume: "https://example.com/resume12.pdf",
      country: "Portugal",
      phone: "+351-555-0134",
      desc: "Voice-over artist and podcast producer",
      isSeller: true,
      isAdmin: false
    },
    {
      username: "admin_user",
      email: "admin@skillsprint.com",
      password: bcrypt.hashSync("admin123", 5),
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      country: "United States",
      phone: "+1-555-0000",
      desc: "Platform administrator",
      isSeller: false,
      isAdmin: true
    },
    {
      username: "buyer1",
      email: "buyer1@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      country: "United States",
      phone: "+1-555-1001",
      desc: "Looking for quality services",
      isSeller: false,
      isAdmin: false
    },
    {
      username: "buyer2",
      email: "buyer2@example.com",
      password: bcrypt.hashSync("password123", 5),
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      country: "Canada",
      phone: "+1-555-1002",
      desc: "Startup founder seeking talented freelancers",
      isSeller: false,
      isAdmin: false
    }
  ];

  try {
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} users seeded successfully!`);
    return createdUsers;
  } catch (error) {
    console.log("Error seeding users:", error);
  }
};

// Seed Gig Categories
const seedGigCategories = async () => {
  const categories = [
    {
      name: "Graphics & Design",
      cat_desc: "Logo design, branding, and visual identity",
      cat_img: "https://images.unsplash.com/photo-1626785774573-4b799213456f?w=400&h=300&fit=crop"
    },
    {
      name: "Programming & Tech",
      cat_desc: "Web development, mobile apps, and software solutions",
      cat_img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop"
    },
    {
      name: "Digital Marketing",
      cat_desc: "SEO, social media, and online advertising",
      cat_img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      name: "Writing & Translation",
      cat_desc: "Content writing, copywriting, and translation services",
      cat_img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop"
    },
    {
      name: "Video & Animation",
      cat_desc: "Video editing, motion graphics, and animation",
      cat_img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop"
    },
    {
      name: "Music & Audio",
      cat_desc: "Voice-over, music production, and audio editing",
      cat_img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
    },
    {
      name: "Business",
      cat_desc: "Virtual assistance, business consulting, and legal services",
      cat_img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      name: "Data",
      cat_desc: "Data analysis, machine learning, and AI services",
      cat_img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      name: "Photography",
      cat_desc: "Product photography, portrait sessions, and photo editing",
      cat_img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      name: "Lifestyle",
      cat_desc: "Fitness coaching, wellness, and personal development",
      cat_img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      name: "3D & Modeling",
      cat_desc: "3D modeling, architectural visualization, and game assets",
      cat_img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      name: "Architecture & Interior Design",
      cat_desc: "Architectural plans, interior design, and CAD services",
      cat_img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  try {
    const createdCategories = await GigCategories.insertMany(categories);
    console.log(`✅ ${createdCategories.length} gig categories seeded successfully!`);
    return createdCategories;
  } catch (error) {
    console.log("Error seeding gig categories:", error);
  }
};

// Main seeding function
const seedAll = async () => {
  await connect();
  await clearCollections();
  
  console.log("🌱 Starting database seeding...");
  
  const users = await seedUsers();
  const categories = await seedGigCategories();
  const gigs = await seedGigs(users, categories);
  const orders = await seedOrders(users, gigs);
  const reviews = await seedReviews(users, gigs);
  const conversations = await seedConversations(users);
  const messages = await seedMessages(users, conversations);
  const orderTracking = await seedOrderTracking(users, orders);
  const orderUpdates = await seedOrderUpdates(orders);
  
  console.log("✅ Database seeding completed!");
  console.log("\n📊 Seeding Summary:");
  console.log(`👥 Users: ${users.length}`);
  console.log(`📂 Categories: ${categories.length}`);
  console.log(`💼 Gigs: ${gigs.length}`);
  console.log(`📦 Orders: ${orders.length}`);
  console.log(`⭐ Reviews: ${reviews.length}`);
  console.log(`💬 Conversations: ${conversations.length}`);
  console.log(`💭 Messages: ${messages.length}`);
  console.log(`📈 Order Tracking: ${orderTracking.length}`);
  console.log(`🔄 Order Updates: ${orderUpdates.length}`);
  
  process.exit(0);
};

seedAll(); 