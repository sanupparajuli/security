import Review from "../models/review.model.js";

const seedReviews = async (users, gigs) => {
  const reviews = [
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[0]._id.toString(),
      star: 5,
      desc: "Excellent work! The React website turned out exactly as I envisioned. Fast delivery and great communication throughout the project. Highly recommended!"
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[1]._id.toString(),
      star: 5,
      desc: "Amazing logo design! Sarah created a perfect brand identity that perfectly represents our company. Professional, creative, and delivered on time."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[2]._id.toString(),
      star: 4,
      desc: "Great Django application development. Mike was very knowledgeable and delivered a solid product. Would work with again!"
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[3]._id.toString(),
      star: 5,
      desc: "Emma's UI/UX design skills are outstanding! She created a beautiful and intuitive mobile app design that exceeded my expectations."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[4]._id.toString(),
      star: 4,
      desc: "Alex did a fantastic job with the React Native app. Cross-platform development was seamless and the app works perfectly on both iOS and Android."
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[5]._id.toString(),
      star: 5,
      desc: "Lisa's content writing is exceptional! SEO-optimized, engaging, and delivered quickly. Our website traffic increased significantly after her work."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[6]._id.toString(),
      star: 4,
      desc: "David created a comprehensive digital marketing strategy that really helped our business grow. Professional approach and great results!"
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[7]._id.toString(),
      star: 5,
      desc: "Anna's video editing skills are top-notch! She transformed our raw footage into a professional promotional video. Highly skilled and creative."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[8]._id.toString(),
      star: 4,
      desc: "Tom's machine learning expertise is impressive. He built a custom model that perfectly fits our data analysis needs. Very knowledgeable in the field."
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[9]._id.toString(),
      star: 5,
      desc: "Sophie's illustrations are absolutely beautiful! She created custom character designs that perfectly match our brand. Creative and professional."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[10]._id.toString(),
      star: 4,
      desc: "James created amazing 3D models for our game project. High-quality assets that work perfectly in our game engine. Great attention to detail."
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[11]._id.toString(),
      star: 5,
      desc: "Maria's voice-over work is exceptional! Professional quality, clear pronunciation, and perfect timing. Made our video project come to life."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[0]._id.toString(),
      star: 4,
      desc: "Second time working with John. Consistent quality and great communication. The React website he built for us is performing excellently."
    },
    {
      userId: users.find(u => u.username === "buyer2")._id.toString(),
      gigId: gigs[1]._id.toString(),
      star: 5,
      desc: "Sarah's brand identity work is consistently excellent. She has a great eye for design and always delivers beyond expectations."
    },
    {
      userId: users.find(u => u.username === "buyer1")._id.toString(),
      gigId: gigs[2]._id.toString(),
      star: 5,
      desc: "Mike's Django development skills are outstanding. He built a complex web application that handles all our business needs efficiently."
    }
  ];

  try {
    const createdReviews = await Review.insertMany(reviews);
    console.log(`✅ ${createdReviews.length} reviews seeded successfully!`);
    return createdReviews;
  } catch (error) {
    console.log("Error seeding reviews:", error);
  }
};

export default seedReviews; 