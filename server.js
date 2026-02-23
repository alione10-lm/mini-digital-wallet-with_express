import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "it works !" });
});

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
