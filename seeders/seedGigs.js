import Gig from "../models/gig.model.js";

const seedGigs = async (users, categories) => {
  const gigs = [
    {
      userId: users.find(u => u.username === "john_doe")._id.toString(),
      sellerUsername: "john_doe",
      title: "I will create a modern React website with responsive design",
      cat: "Programming & Tech",
      desc: "I will create a stunning, fully responsive React website with modern design principles. Includes SEO optimization, fast loading times, and mobile-first approach. Perfect for businesses looking to establish a strong online presence.",
      totalStars: 4.8,
      starNumber: 127,
      price: 299,
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      shortTitle: "Modern React Website",
      shortDesc: "Professional React development with responsive design",
      deliveryTime: 7,
      revisionNumber: 3,
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Fast Loading",
        "Mobile First",
        "Modern UI/UX"
      ],
      sales: 45
    },
    {
      userId: users.find(u => u.username === "sarah_smith")._id.toString(),
      sellerUsername: "sarah_smith",
      title: "I will design a professional logo and brand identity package",
      cat: "Graphics & Design",
      desc: "I will create a unique, professional logo design along with a complete brand identity package. This includes logo variations, color palette, typography guidelines, and brand style guide. Perfect for startups and established businesses.",
      totalStars: 4.9,
      starNumber: 203,
      price: 199,
      cover: "https://images.unsplash.com/photo-1626785774573-4b799213456f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
      ],
      shortTitle: "Logo & Brand Identity",
      shortDesc: "Professional logo design and complete brand package",
      deliveryTime: 5,
      revisionNumber: 5,
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Color Palette",
        "Typography",
        "Multiple Formats"
      ],
      sales: 78
    },
    {
      userId: users.find(u => u.username === "mike_wilson")._id.toString(),
      sellerUsername: "mike_wilson",
      title: "I will develop a full-stack web application with Python Django",
      cat: "Programming & Tech",
      desc: "I will build a complete web application using Python Django framework. Includes user authentication, database design, API development, and deployment setup. Suitable for e-commerce, social platforms, or business management systems.",
      totalStars: 4.7,
      starNumber: 89,
      price: 599,
      cover: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      shortTitle: "Django Web Application",
      shortDesc: "Full-stack development with Python Django",
      deliveryTime: 14,
      revisionNumber: 4,
      features: [
        "User Authentication",
        "Database Design",
        "API Development",
        "Admin Panel",
        "Deployment Ready"
      ],
      sales: 23
    },
    {
      userId: users.find(u => u.username === "emma_davis")._id.toString(),
      sellerUsername: "emma_davis",
      title: "I will create a complete UI/UX design for your mobile app",
      cat: "Graphics & Design",
      desc: "I will design a complete UI/UX solution for your mobile application. This includes wireframes, mockups, prototypes, and design system. Focus on user experience and modern design trends to create engaging interfaces.",
      totalStars: 4.8,
      starNumber: 156,
      price: 399,
      cover: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1626785774573-4b799213456f?w=800&h=600&fit=crop"
      ],
      shortTitle: "Mobile App UI/UX Design",
      shortDesc: "Complete mobile app design with modern UI/UX",
      deliveryTime: 10,
      revisionNumber: 4,
      features: [
        "Wireframes",
        "Mockups",
        "Prototypes",
        "Design System",
        "User Testing"
      ],
      sales: 34
    },
    {
      userId: users.find(u => u.username === "alex_chen")._id.toString(),
      sellerUsername: "alex_chen",
      title: "I will develop a cross-platform mobile app with React Native",
      cat: "Programming & Tech",
      desc: "I will create a high-performance mobile application using React Native that works on both iOS and Android. Includes native features, push notifications, offline functionality, and app store deployment preparation.",
      totalStars: 4.6,
      starNumber: 112,
      price: 799,
      cover: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      shortTitle: "React Native Mobile App",
      shortDesc: "Cross-platform mobile development with React Native",
      deliveryTime: 21,
      revisionNumber: 5,
      features: [
        "iOS & Android",
        "Push Notifications",
        "Offline Support",
        "Native Features",
        "App Store Ready"
      ],
      sales: 18
    },
    {
      userId: users.find(u => u.username === "lisa_brown")._id.toString(),
      sellerUsername: "lisa_brown",
      title: "I will write engaging content for your website and blog",
      cat: "Writing & Translation",
      desc: "I will create high-quality, SEO-optimized content for your website, blog, or marketing materials. Includes keyword research, engaging copywriting, and content strategy. Perfect for businesses looking to improve their online presence.",
      totalStars: 4.9,
      starNumber: 234,
      price: 99,
      cover: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      ],
      shortTitle: "Website & Blog Content",
      shortDesc: "SEO-optimized content writing for websites and blogs",
      deliveryTime: 3,
      revisionNumber: 3,
      features: [
        "SEO Optimized",
        "Keyword Research",
        "Engaging Copy",
        "Content Strategy",
        "Fast Delivery"
      ],
      sales: 156
    },
    {
      userId: users.find(u => u.username === "david_miller")._id.toString(),
      sellerUsername: "david_miller",
      title: "I will create a comprehensive digital marketing strategy",
      cat: "Digital Marketing",
      desc: "I will develop a complete digital marketing strategy including SEO, social media marketing, PPC campaigns, and content marketing. Includes competitor analysis, keyword research, and performance tracking setup.",
      totalStars: 4.7,
      starNumber: 167,
      price: 299,
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      shortTitle: "Digital Marketing Strategy",
      shortDesc: "Complete digital marketing strategy and implementation",
      deliveryTime: 7,
      revisionNumber: 3,
      features: [
        "SEO Strategy",
        "Social Media Marketing",
        "PPC Campaigns",
        "Content Marketing",
        "Analytics Setup"
      ],
      sales: 42
    },
    {
      userId: users.find(u => u.username === "anna_garcia")._id.toString(),
      sellerUsername: "anna_garcia",
      title: "I will edit and enhance your video with professional quality",
      cat: "Video & Animation",
      desc: "I will edit your video with professional-grade software, including color correction, audio enhancement, transitions, and special effects. Perfect for YouTube content, promotional videos, or personal projects.",
      totalStars: 4.8,
      starNumber: 189,
      price: 149,
      cover: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop"
      ],
      shortTitle: "Professional Video Editing",
      shortDesc: "High-quality video editing and enhancement",
      deliveryTime: 5,
      revisionNumber: 3,
      features: [
        "Color Correction",
        "Audio Enhancement",
        "Transitions",
        "Special Effects",
        "Multiple Formats"
      ],
      sales: 89
    },
    {
      userId: users.find(u => u.username === "tom_lee")._id.toString(),
      sellerUsername: "tom_lee",
      title: "I will build a machine learning model for your data analysis",
      cat: "Data",
      desc: "I will develop a custom machine learning model for your specific use case. Includes data preprocessing, model selection, training, validation, and deployment. Suitable for prediction, classification, or pattern recognition tasks.",
      totalStars: 4.6,
      starNumber: 78,
      price: 899,
      cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop"
      ],
      shortTitle: "Machine Learning Model",
      shortDesc: "Custom ML model development and deployment",
      deliveryTime: 14,
      revisionNumber: 3,
      features: [
        "Data Preprocessing",
        "Model Selection",
        "Training & Validation",
        "Performance Metrics",
        "Deployment Ready"
      ],
      sales: 12
    },
    {
      userId: users.find(u => u.username === "sophie_taylor")._id.toString(),
      sellerUsername: "sophie_taylor",
      title: "I will create custom illustrations and character designs",
      cat: "Graphics & Design",
      desc: "I will create unique, custom illustrations and character designs in various styles. Perfect for books, games, branding, or personal projects. Includes multiple revisions and various file formats.",
      totalStars: 4.9,
      starNumber: 145,
      price: 199,
      cover: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1626785774573-4b799213456f?w=800&h=600&fit=crop"
      ],
      shortTitle: "Custom Illustrations",
      shortDesc: "Unique illustrations and character designs",
      deliveryTime: 7,
      revisionNumber: 4,
      features: [
        "Custom Designs",
        "Multiple Styles",
        "Character Design",
        "High Resolution",
        "Various Formats"
      ],
      sales: 67
    },
    {
      userId: users.find(u => u.username === "james_rodriguez")._id.toString(),
      sellerUsername: "james_rodriguez",
      title: "I will create 3D models and game assets for your project",
      cat: "3D & Modeling",
      desc: "I will create high-quality 3D models, textures, and game assets using industry-standard software. Includes low-poly and high-poly models, UV mapping, and optimized assets ready for game engines.",
      totalStars: 4.7,
      starNumber: 98,
      price: 299,
      cover: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
      ],
      shortTitle: "3D Models & Game Assets",
      shortDesc: "Professional 3D modeling and game asset creation",
      deliveryTime: 10,
      revisionNumber: 3,
      features: [
        "High-Quality Models",
        "UV Mapping",
        "Texture Creation",
        "Game Engine Ready",
        "Multiple Formats"
      ],
      sales: 28
    },
    {
      userId: users.find(u => u.username === "maria_silva")._id.toString(),
      sellerUsername: "maria_silva",
      title: "I will provide professional voice-over services for your content",
      cat: "Music & Audio",
      desc: "I will provide high-quality voice-over services for commercials, videos, podcasts, and other content. Includes multiple takes, professional recording equipment, and various voice styles and accents.",
      totalStars: 4.8,
      starNumber: 203,
      price: 149,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop"
      ],
      shortTitle: "Professional Voice-Over",
      shortDesc: "High-quality voice-over services for all content types",
      deliveryTime: 3,
      revisionNumber: 2,
      features: [
        "Professional Quality",
        "Multiple Takes",
        "Various Styles",
        "Fast Delivery",
        "Multiple Formats"
      ],
      sales: 134
    },
    {
      userId: users.find(u => u.username === "john_doe")._id.toString(),
      sellerUsername: "john_doe",
      title: "I will create a complete WordPress website with custom theme",
      cat: "Programming & Tech",
      desc: "I will build a professional WordPress website with a custom theme, plugins, and SEO optimization. Includes responsive design, content management system, and training for easy updates.",
      totalStars: 4.7,
      starNumber: 156,
      price: 399,
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      shortTitle: "WordPress Website",
      shortDesc: "Custom WordPress website with responsive design",
      deliveryTime: 10,
      revisionNumber: 4,
      features: [
        "Custom Theme",
        "Responsive Design",
        "SEO Optimized",
        "Content Management",
        "Training Included"
      ],
      sales: 89
    },
    {
      userId: users.find(u => u.username === "sarah_smith")._id.toString(),
      sellerUsername: "sarah_smith",
      title: "I will design social media graphics and marketing materials",
      cat: "Graphics & Design",
      desc: "I will create eye-catching social media graphics, marketing materials, and promotional content. Includes templates for various platforms, brand consistency, and high-resolution files.",
      totalStars: 4.8,
      starNumber: 178,
      price: 99,
      cover: "https://images.unsplash.com/photo-1626785774573-4b799213456f?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
      ],
      shortTitle: "Social Media Graphics",
      shortDesc: "Professional social media and marketing graphics",
      deliveryTime: 3,
      revisionNumber: 3,
      features: [
        "Social Media Ready",
        "Multiple Formats",
        "Brand Consistency",
        "High Resolution",
        "Quick Delivery"
      ],
      sales: 245
    },
    {
      userId: users.find(u => u.username === "mike_wilson")._id.toString(),
      sellerUsername: "mike_wilson",
      title: "I will develop a RESTful API with Node.js and Express",
      cat: "Programming & Tech",
      desc: "I will build a robust RESTful API using Node.js, Express, and MongoDB. Includes authentication, data validation, error handling, and comprehensive documentation.",
      totalStars: 4.6,
      starNumber: 134,
      price: 299,
      cover: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      shortTitle: "RESTful API Development",
      shortDesc: "Professional API development with Node.js and Express",
      deliveryTime: 7,
      revisionNumber: 3,
      features: [
        "RESTful Design",
        "Authentication",
        "Data Validation",
        "Error Handling",
        "API Documentation"
      ],
      sales: 67
    }
  ];

  try {
    const createdGigs = await Gig.insertMany(gigs);
    console.log(`✅ ${createdGigs.length} gigs seeded successfully!`);
    return createdGigs;
  } catch (error) {
    console.log("Error seeding gigs:", error);
  }
};

export default seedGigs; 