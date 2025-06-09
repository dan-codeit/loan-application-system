import session from "express-session";

export default session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
});
