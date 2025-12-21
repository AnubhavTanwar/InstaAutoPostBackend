// import dotenv from "dotenv";
// dotenv.config();
// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on port ${PORT}`);
// });












// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// console.log("✅ OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);
// console.log("IG TOKEN EXISTS:", !!process.env.INSTAGRAM_TOKEN);
// console.log("IG ACCOUNT ID:", process.env.INSTAGRAM_ACCOUNT_ID);

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on port ${PORT}`);
// });











import dotenv from "dotenv";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../uploads"))
);

console.log("✅ OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);
console.log("IG TOKEN EXISTS:", !!process.env.INSTAGRAM_TOKEN);
console.log("IG ACCOUNT ID:", process.env.INSTAGRAM_ACCOUNT_ID);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
