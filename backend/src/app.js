import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health-Check endpoint'i
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "C2221031010"
  });
});

// Etkinlik rotaları
app.use("/events", eventRoutes);

// Eşleşmeyen rotalar için 404
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;