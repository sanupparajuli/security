import Conversation from "../models/conversation.model.js";

const seedConversations = async (users) => {
  const conversations = [
    {
      id: "conv_1",
      sellerId: users.find(u => u.username === "john_doe")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: true,
      readByBuyer: false,
      lastMessage: "Hi! I'm interested in your React website development service. Can you tell me more about your process?"
    },
    {
      id: "conv_2",
      sellerId: users.find(u => u.username === "sarah_smith")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: false,
      readByBuyer: true,
      lastMessage: "Thank you for the logo design! It's exactly what we were looking for."
    },
    {
      id: "conv_3",
      sellerId: users.find(u => u.username === "mike_wilson")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: true,
      readByBuyer: true,
      lastMessage: "The Django application is progressing well. I'll send you the latest updates by tomorrow."
    },
    {
      id: "conv_4",
      sellerId: users.find(u => u.username === "emma_davis")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: false,
      lastMessage: "I've completed the wireframes for your mobile app. Would you like to review them?"
    },
    {
      id: "conv_5",
      sellerId: users.find(u => u.username === "alex_chen")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: false,
      readByBuyer: true,
      lastMessage: "The React Native app is ready for testing. I've sent you the APK file."
    },
    {
      id: "conv_6",
      sellerId: users.find(u => u.username === "lisa_brown")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: true,
      lastMessage: "I've finished writing the blog content. The SEO optimization is complete as well."
    },
    {
      id: "conv_7",
      sellerId: users.find(u => u.username === "david_miller")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: false,
      readByBuyer: false,
      lastMessage: "Your digital marketing strategy is ready. I've included detailed analytics and campaign recommendations."
    },
    {
      id: "conv_8",
      sellerId: users.find(u => u.username === "anna_garcia")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: true,
      lastMessage: "The video editing is complete! I've added some professional transitions and color grading."
    },
    {
      id: "conv_9",
      sellerId: users.find(u => u.username === "tom_lee")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: false,
      readByBuyer: true,
      lastMessage: "The machine learning model training is in progress. I'll have results by the end of the week."
    },
    {
      id: "conv_10",
      sellerId: users.find(u => u.username === "sophie_taylor")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: false,
      lastMessage: "I've created the character designs you requested. They match your brand perfectly!"
    },
    {
      id: "conv_11",
      sellerId: users.find(u => u.username === "james_rodriguez")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: true,
      readByBuyer: true,
      lastMessage: "The 3D models are ready for your game. I've optimized them for performance."
    },
    {
      id: "conv_12",
      sellerId: users.find(u => u.username === "maria_silva")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: false,
      readByBuyer: true,
      lastMessage: "I've recorded the voice-over for your commercial. The audio quality is professional grade."
    },
    {
      id: "conv_13",
      sellerId: users.find(u => u.username === "john_doe")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: false,
      lastMessage: "I'm available for your next website project. Let me know what you have in mind!"
    },
    {
      id: "conv_14",
      sellerId: users.find(u => u.username === "sarah_smith")._id.toString(),
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      readBySeller: false,
      readByBuyer: true,
      lastMessage: "I can help you with your brand identity needs. What type of business are you working with?"
    },
    {
      id: "conv_15",
      sellerId: users.find(u => u.username === "mike_wilson")._id.toString(),
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      readBySeller: true,
      readByBuyer: true,
      lastMessage: "The Django project is complete and deployed. All features are working as expected."
    }
  ];

  try {
    const createdConversations = await Conversation.insertMany(conversations);
    console.log(`✅ ${createdConversations.length} conversations seeded successfully!`);
    return createdConversations;
  } catch (error) {
    console.log("Error seeding conversations:", error);
  }
};

export default seedConversations; 