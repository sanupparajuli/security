import Order from "../models/order.model.js";

const seedOrders = async (users, gigs) => {
  const orders = [
    {
      gigId: gigs[0]._id,
      img: gigs[0].cover,
      title: gigs[0].title,
      price: gigs[0].price,
      sellerId: gigs[0].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 85,
      isCompleted: false
    },
    {
      gigId: gigs[1]._id,
      img: gigs[1].cover,
      title: gigs[1].title,
      price: gigs[1].price,
      sellerId: gigs[1].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[2]._id,
      img: gigs[2].cover,
      title: gigs[2].title,
      price: gigs[2].price,
      sellerId: gigs[2].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 60,
      isCompleted: false
    },
    {
      gigId: gigs[3]._id,
      img: gigs[3].cover,
      title: gigs[3].title,
      price: gigs[3].price,
      sellerId: gigs[3].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[4]._id,
      img: gigs[4].cover,
      title: gigs[4].title,
      price: gigs[4].price,
      sellerId: gigs[4].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 25,
      isCompleted: false
    },
    {
      gigId: gigs[5]._id,
      img: gigs[5].cover,
      title: gigs[5].title,
      price: gigs[5].price,
      sellerId: gigs[5].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[6]._id,
      img: gigs[6].cover,
      title: gigs[6].title,
      price: gigs[6].price,
      sellerId: gigs[6].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[7]._id,
      img: gigs[7].cover,
      title: gigs[7].title,
      price: gigs[7].price,
      sellerId: gigs[7].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 75,
      isCompleted: false
    },
    {
      gigId: gigs[8]._id,
      img: gigs[8].cover,
      title: gigs[8].title,
      price: gigs[8].price,
      sellerId: gigs[8].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 40,
      isCompleted: false
    },
    {
      gigId: gigs[9]._id,
      img: gigs[9].cover,
      title: gigs[9].title,
      price: gigs[9].price,
      sellerId: gigs[9].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[10]._id,
      img: gigs[10].cover,
      title: gigs[10].title,
      price: gigs[10].price,
      sellerId: gigs[10].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 90,
      isCompleted: false
    },
    {
      gigId: gigs[11]._id,
      img: gigs[11].cover,
      title: gigs[11].title,
      price: gigs[11].price,
      sellerId: gigs[11].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[12]._id,
      img: gigs[12].cover,
      title: gigs[12].title,
      price: gigs[12].price,
      sellerId: gigs[12].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 15,
      isCompleted: false
    },
    {
      gigId: gigs[0]._id,
      img: gigs[0].cover,
      title: gigs[0].title,
      price: gigs[0].price,
      sellerId: gigs[0].userId,
      buyerId: users.find(u => u.username === "buyer2")._id.toString(),
      buyerUsername: "buyer2",
      completion_percentage: 100,
      isCompleted: true
    },
    {
      gigId: gigs[1]._id,
      img: gigs[1].cover,
      title: gigs[1].title,
      price: gigs[1].price,
      sellerId: gigs[1].userId,
      buyerId: users.find(u => u.username === "buyer1")._id.toString(),
      buyerUsername: "buyer1",
      completion_percentage: 50,
      isCompleted: false
    }
  ];

  try {
    const createdOrders = await Order.insertMany(orders);
    console.log(`✅ ${createdOrders.length} orders seeded successfully!`);
    return createdOrders;
  } catch (error) {
    console.log("Error seeding orders:", error);
  }
};

export default seedOrders; 