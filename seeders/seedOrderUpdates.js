import OrderUpdates from "../models/orderupdates.model.js";

const seedOrderUpdates = async (orders) => {
  const orderUpdates = [
    {
      orderId: orders[0]._id.toString(),
      title: "Project Initiation",
      desc: "Started working on the React website project. Gathering requirements and setting up the development environment.",
      complete: true
    },
    {
      orderId: orders[0]._id.toString(),
      title: "Design Phase",
      desc: "Created wireframes and mockups for the website layout. Client approved the initial design concepts.",
      complete: true
    },
    {
      orderId: orders[0]._id.toString(),
      title: "Development Phase",
      desc: "Currently implementing the React components and integrating the backend API. Progress is on schedule.",
      complete: false
    },
    {
      orderId: orders[1]._id.toString(),
      title: "Logo Design Complete",
      desc: "Finalized the logo design with multiple variations. All brand guidelines have been created.",
      complete: true
    },
    {
      orderId: orders[1]._id.toString(),
      title: "Brand Package Delivery",
      desc: "Delivered complete brand identity package including logo files, color palette, and style guide.",
      complete: true
    },
    {
      orderId: orders[2]._id.toString(),
      title: "Django Setup",
      desc: "Set up Django project structure and configured the development environment.",
      complete: true
    },
    {
      orderId: orders[2]._id.toString(),
      title: "Database Design",
      desc: "Designed and implemented the database schema. Created models and migrations.",
      complete: true
    },
    {
      orderId: orders[2]._id.toString(),
      title: "API Development",
      desc: "Currently developing RESTful APIs for the application. Core functionality is being implemented.",
      complete: false
    },
    {
      orderId: orders[3]._id.toString(),
      title: "UI/UX Research",
      desc: "Completed user research and competitor analysis for the mobile app design.",
      complete: true
    },
    {
      orderId: orders[3]._id.toString(),
      title: "Wireframes Complete",
      desc: "Created comprehensive wireframes for all app screens. Ready for client review.",
      complete: true
    },
    {
      orderId: orders[4]._id.toString(),
      title: "React Native Setup",
      desc: "Initialized React Native project and configured development environment for cross-platform development.",
      complete: true
    },
    {
      orderId: orders[4]._id.toString(),
      title: "Core Features",
      desc: "Implementing core app features and navigation structure. Making good progress.",
      complete: false
    },
    {
      orderId: orders[5]._id.toString(),
      title: "Content Research",
      desc: "Completed keyword research and content strategy planning for the website content.",
      complete: true
    },
    {
      orderId: orders[5]._id.toString(),
      title: "Content Writing",
      desc: "Finished writing all blog posts and website content with SEO optimization.",
      complete: true
    },
    {
      orderId: orders[6]._id.toString(),
      title: "Marketing Analysis",
      desc: "Conducted comprehensive market analysis and competitor research for digital marketing strategy.",
      complete: true
    },
    {
      orderId: orders[6]._id.toString(),
      title: "Strategy Development",
      desc: "Developed complete digital marketing strategy including SEO, PPC, and social media campaigns.",
      complete: true
    },
    {
      orderId: orders[7]._id.toString(),
      title: "Video Review",
      desc: "Reviewed raw footage and planned editing approach for the promotional video.",
      complete: true
    },
    {
      orderId: orders[7]._id.toString(),
      title: "Editing Process",
      desc: "Currently editing video with professional transitions and color grading. Making excellent progress.",
      complete: false
    },
    {
      orderId: orders[8]._id.toString(),
      title: "Data Preprocessing",
      desc: "Completed data cleaning and preprocessing for the machine learning model.",
      complete: true
    },
    {
      orderId: orders[8]._id.toString(),
      title: "Model Training",
      desc: "Currently training the machine learning model. Will have initial results soon.",
      complete: false
    },
    {
      orderId: orders[9]._id.toString(),
      title: "Character Design",
      desc: "Created initial character sketches and concepts based on client requirements.",
      complete: true
    },
    {
      orderId: orders[9]._id.toString(),
      title: "Final Illustrations",
      desc: "Completed all character designs and illustrations in various styles and formats.",
      complete: true
    },
    {
      orderId: orders[10]._id.toString(),
      title: "3D Modeling",
      desc: "Created high-quality 3D models for the game project with proper topology.",
      complete: true
    },
    {
      orderId: orders[10]._id.toString(),
      title: "Asset Optimization",
      desc: "Currently optimizing 3D models for game engine performance and creating textures.",
      complete: false
    },
    {
      orderId: orders[11]._id.toString(),
      title: "Script Review",
      desc: "Reviewed the commercial script and prepared for voice-over recording.",
      complete: true
    },
    {
      orderId: orders[11]._id.toString(),
      title: "Voice Recording",
      desc: "Completed professional voice-over recording with multiple takes and variations.",
      complete: true
    },
    {
      orderId: orders[12]._id.toString(),
      title: "Project Planning",
      desc: "Started planning the new React website project. Gathering client requirements.",
      complete: true
    },
    {
      orderId: orders[13]._id.toString(),
      title: "Brand Consultation",
      desc: "Conducted initial brand consultation to understand client's business and design needs.",
      complete: true
    },
    {
      orderId: orders[14]._id.toString(),
      title: "Django Development",
      desc: "Completed Django web application development with all requested features.",
      complete: true
    }
  ];

  try {
    const createdOrderUpdates = await OrderUpdates.insertMany(orderUpdates);
    console.log(`✅ ${createdOrderUpdates.length} order updates seeded successfully!`);
    return createdOrderUpdates;
  } catch (error) {
    console.log("Error seeding order updates:", error);
  }
};

export default seedOrderUpdates; 