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



app.listen(3000, () => {
  console.log("server running on port 3000");
});
