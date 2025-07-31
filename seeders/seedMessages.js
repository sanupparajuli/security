import Message from "../models/message.model.js";

const seedMessages = async (users, conversations) => {
  const messages = [
    {
      conversationId: "conv_1",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Hi! I'm interested in your React website development service. Can you tell me more about your process?"
    },
    {
      conversationId: "conv_1",
      userId: users.find(u => u.username === "john_doe")._id.toString(),
      desc: "Hello! I'd be happy to help you with your React website. I typically start with understanding your requirements, then create wireframes, and finally develop the full website. What kind of website are you looking for?"
    },
    {
      conversationId: "conv_1",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "I need a business website for my startup. It should be modern, responsive, and include a contact form. How long does it usually take?"
    },
    {
      conversationId: "conv_2",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "Thank you for the logo design! It's exactly what we were looking for."
    },
    {
      conversationId: "conv_2",
      userId: users.find(u => u.username === "sarah_smith")._id.toString(),
      desc: "You're very welcome! I'm glad you're happy with the result. Don't hesitate to reach out if you need any modifications or additional brand assets."
    },
    {
      conversationId: "conv_3",
      userId: users.find(u => u.username === "mike_wilson")._id.toString(),
      desc: "The Django application is progressing well. I'll send you the latest updates by tomorrow."
    },
    {
      conversationId: "conv_3",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Great! Looking forward to seeing the progress. Can you also include the database schema in the update?"
    },
    {
      conversationId: "conv_4",
      userId: users.find(u => u.username === "emma_davis")._id.toString(),
      desc: "I've completed the wireframes for your mobile app. Would you like to review them?"
    },
    {
      conversationId: "conv_4",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "Yes, please send them over! I'm excited to see the design direction."
    },
    {
      conversationId: "conv_5",
      userId: users.find(u => u.username === "alex_chen")._id.toString(),
      desc: "The React Native app is ready for testing. I've sent you the APK file."
    },
    {
      conversationId: "conv_5",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Perfect! I'll test it on both Android and iOS devices and let you know if there are any issues."
    },
    {
      conversationId: "conv_6",
      userId: users.find(u => u.username === "lisa_brown")._id.toString(),
      desc: "I've finished writing the blog content. The SEO optimization is complete as well."
    },
    {
      conversationId: "conv_6",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "Excellent! The content looks great and the SEO improvements are already showing results."
    },
    {
      conversationId: "conv_7",
      userId: users.find(u => u.username === "david_miller")._id.toString(),
      desc: "Your digital marketing strategy is ready. I've included detailed analytics and campaign recommendations."
    },
    {
      conversationId: "conv_7",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Thank you! The strategy looks comprehensive. When can we start implementing the campaigns?"
    },
    {
      conversationId: "conv_8",
      userId: users.find(u => u.username === "anna_garcia")._id.toString(),
      desc: "The video editing is complete! I've added some professional transitions and color grading."
    },
    {
      conversationId: "conv_8",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "Wow! The video looks amazing. The transitions are smooth and the color grading really makes it pop."
    },
    {
      conversationId: "conv_9",
      userId: users.find(u => u.username === "tom_lee")._id.toString(),
      desc: "The machine learning model training is in progress. I'll have results by the end of the week."
    },
    {
      conversationId: "conv_9",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Sounds good! Can you also include the model performance metrics in the report?"
    },
    {
      conversationId: "conv_10",
      userId: users.find(u => u.username === "sophie_taylor")._id.toString(),
      desc: "I've created the character designs you requested. They match your brand perfectly!"
    },
    {
      conversationId: "conv_10",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "The characters look fantastic! They capture the essence of our brand perfectly. Great work!"
    },
    {
      conversationId: "conv_11",
      userId: users.find(u => u.username === "james_rodriguez")._id.toString(),
      desc: "The 3D models are ready for your game. I've optimized them for performance."
    },
    {
      conversationId: "conv_11",
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      desc: "Perfect! The models look great and the optimization will help with game performance."
    },
    {
      conversationId: "conv_12",
      userId: users.find(u => u.username === "maria_silva")._id.toString(),
      desc: "I've recorded the voice-over for your commercial. The audio quality is professional grade."
    },
    {
      conversationId: "conv_12",
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      desc: "The voice-over sounds excellent! Clear pronunciation and perfect timing. Thank you!"
    },
    {
      conversationId: "conv_13",
      userId: users.find(u => u.username === "john_doe")._id.toString(),
      desc: "I'm available for your next website project. Let me know what you have in mind!"
    },
    {
      conversationId: "conv_14",
      userId: users.find(u => u.username === "sarah_smith")._id.toString(),
      desc: "I can help you with your brand identity needs. What type of business are you working with?"
    },
    {
      conversationId: "conv_15",
      userId: users.find(u => u.username === "mike_wilson")._id.toString(),
      desc: "The Django project is complete and deployed. All features are working as expected."
    }
  ];

  try {
    const createdMessages = await Message.insertMany(messages);
    console.log(`✅ ${createdMessages.length} messages seeded successfully!`);
    return createdMessages;
  } catch (error) {
    console.log("Error seeding messages:", error);
  }
};

export default seedMessages; 