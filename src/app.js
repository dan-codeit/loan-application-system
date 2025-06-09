import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middlewares/rateLimiter.js";
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applications.js";
import adminRoutes from "./routes/admin.js";
import http from "http";
import socketTestRoutes from "./routes/socketTest.js";
import { setupWebSocket } from "./sockets/index.js";
import sendMessage from "./routes/message.routes.js";
import testSMS from "./routes/devOnlyRoutes.js";
import resendOTProute from "./routes/auth.js";
import paymentRoutes from "./routes/payment.route.js";
import devOtpRoutes from "./routes/devOtp.js";
import devLogin from "./routes/mockLogin.js";

dotenv.config({ path: "/.env.loanApp" });
//import dotenv from "dotenv";
//import path from "path";
//dotenv.config({ path: //path.resolve(process.cwd(), ".env.loanApp") });

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// create HTTP server from express app
const server = http.createServer(app);
// NOW pass server to setupWebSocket
const io = setupWebSocket(server);
// export io if needed elsewhere
export { io };

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/socket", socketTestRoutes);
app.use("/api/message", sendMessage);
app.use("/api/dev", testSMS);
app.use("/api/auth", resendOTProute);
app.use("/api/payment", paymentRoutes);
app.use("/api", devOtpRoutes); // test routes for development
app.use("/api/mock", devLogin); // mock login route for testing

export default app;
