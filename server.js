import bodyParser from "body-parser";
import express from "express";

const app = express();
// app.use(bodyParser);

app.get("/", (req, res) => {
  res.json({ message: "it works !" });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
