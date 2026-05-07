import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import connectDB from "./configs/db.js";

import session from "express-session";
import MongoStore from "connect-mongo";

import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

// ✅ SESSION TYPES
declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}

// ✅ CONNECT DATABASE
await connectDB();

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://thumblify-rosy-tau.vercel.app",
    ],
    credentials: true,
  })
);

// ✅ BODY PARSER
app.use(express.json());

app.set('trust proxy', 1);

// ✅ SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      collectionName: "sessions",
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,

      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      path: "/",
    },
  })
);

// ✅ TEST ROUTE
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is Live!");
});

// ✅ ROUTES
app.use("/api/auth", AuthRouter);
app.use("/api/thumbnail", ThumbnailRouter);
app.use("/api/user", UserRouter);

// ✅ START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});