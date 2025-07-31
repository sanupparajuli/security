import OrderTracking from "../models/ordertracking.model.js";

const seedOrderTracking = async (users, orders) => {
  const orderTracking = [
    {
      orderId: orders[0]._id.toString(),
      sellerId: orders[0].sellerId,
      buyerId: orders[0].buyerId
    },
    {
      orderId: orders[1]._id.toString(),
      sellerId: orders[1].sellerId,
      buyerId: orders[1].buyerId
    },
    {
      orderId: orders[2]._id.toString(),
      sellerId: orders[2].sellerId,
      buyerId: orders[2].buyerId
    },
    {
      orderId: orders[3]._id.toString(),
      sellerId: orders[3].sellerId,
      buyerId: orders[3].buyerId
    },
    {
      orderId: orders[4]._id.toString(),
      sellerId: orders[4].sellerId,
      buyerId: orders[4].buyerId
    },
    {
      orderId: orders[5]._id.toString(),
      sellerId: orders[5].sellerId,
      buyerId: orders[5].buyerId
    },
    {
      orderId: orders[6]._id.toString(),
      sellerId: orders[6].sellerId,
      buyerId: orders[6].buyerId
    },
    {
      orderId: orders[7]._id.toString(),
      sellerId: orders[7].sellerId,
      buyerId: orders[7].buyerId
    },
    {
      orderId: orders[8]._id.toString(),
      sellerId: orders[8].sellerId,
      buyerId: orders[8].buyerId
    },
    {
      orderId: orders[9]._id.toString(),
      sellerId: orders[9].sellerId,
      buyerId: orders[9].buyerId
    },
    {
      orderId: orders[10]._id.toString(),
      sellerId: orders[10].sellerId,
      buyerId: orders[10].buyerId
    },
    {
      orderId: orders[11]._id.toString(),
      sellerId: orders[11].sellerId,
      buyerId: orders[11].buyerId
    },
    {
      orderId: orders[12]._id.toString(),
      sellerId: orders[12].sellerId,
      buyerId: orders[12].buyerId
    },
    {
      orderId: orders[13]._id.toString(),
      sellerId: orders[13].sellerId,
      buyerId: orders[13].buyerId
    },
    {
      orderId: orders[14]._id.toString(),
      sellerId: orders[14].sellerId,
      buyerId: orders[14].buyerId
    }
  ];

  try {
    const createdOrderTracking = await OrderTracking.insertMany(orderTracking);
    console.log(`✅ ${createdOrderTracking.length} order tracking records seeded successfully!`);
    return createdOrderTracking;
  } catch (error) {
    console.log("Error seeding order tracking:", error);
  }
};

export default seedOrderTracking; 