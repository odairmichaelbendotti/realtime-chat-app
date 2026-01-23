import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URI;

export async function mongoConnect() {
  try {
    if (!mongo_url) {
      console.log("MongoDB: URI não fornecida");
      return;
    }

    await mongoose.connect(mongo_url);
    console.log("MongoDB: Conectado.");
  } catch (err) {
    throw err;
  }
}
