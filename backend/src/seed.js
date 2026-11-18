import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

try {
  await connectDatabase();

  await Event.deleteMany({});
  await Event.insertMany(seedEvents);

  console.log(`${seedEvents.length} etkinlik eklendi`);

  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error(`Seed hatası: ${err.message}`);
  await mongoose.disconnect();
  process.exit(1);
}