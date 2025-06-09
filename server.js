import http from "http";
import app from "./src/app.js";
import { sequelize } from "./src/models/index.js";
import { setupWebSocket } from "./src/sockets/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.loanApp" });

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");
    await sequelize.sync({ force: false });
    console.log("✅ Database synced.");
    app.set("io", setupWebSocket(server));
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
