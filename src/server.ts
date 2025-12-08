import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 4008;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error("❌ Failed to start Inventary-Service:", error);
    process.exit(1);
  }
};

startServer();