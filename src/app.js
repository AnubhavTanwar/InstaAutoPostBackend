// import express from "express";
// import cors from "cors";
// // import dotenv from "dotenv";
// import aiRoutes from "./routes/ai.routes.js";
// import instagramRoutes from "./routes/instagram.routes.js";
// import { startScheduler } from "./services/scheduler.service.js";
// import scheduleRoutes from "./routes/schedule.routes.js";

// // dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/ai", aiRoutes);
// app.use("/api/instagram", instagramRoutes);
// app.use("/api/schedule", scheduleRoutes);

// startScheduler();

// export default app;








import path from "path";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import instagramRoutes from "./routes/instagram.routes.js";
import { startScheduler } from "./services/scheduler.service.js";
import scheduleRoutes from "./routes/schedule.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ THIS IS REQUIRED
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ health check
app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/ai", aiRoutes);
app.use("/api/instagram", instagramRoutes);
app.use("/api/schedule", scheduleRoutes);

// ✅ start cron AFTER routes
startScheduler();

export default app;
