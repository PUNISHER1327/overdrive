import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    try {
      await conn.connection.collection('bookings').dropIndex('createdAt_1');
      console.log("Dropped existing TTL index `createdAt_1`");
    } catch (err) {
      if (err.codeName !== 'IndexNotFound') console.log("Error dropping index:", err.message);
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};