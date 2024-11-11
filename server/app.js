import express from "express";
import UsersRouter from "./routes/users.js";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import ItemsRouter from "./routes/items.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: "your secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "None" },
  })
);

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ status: 400, message: "Bad JSON format" });
  }
  next();
});

app.use("/api/users", UsersRouter);
app.use("/api/items", ItemsRouter);

app.use((req, res) => {
  res.status(404).send("Resource not found");
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
