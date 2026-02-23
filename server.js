import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user.route.js";
import walletRouter from "./routes/wallet.route.js";
import { getData } from "./utils/useData.js";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(getData());
});

app.use("/users", userRouter);
app.use("/wallets", walletRouter);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error); // Sift l'error l'middleware lli l-te7t
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
