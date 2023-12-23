const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const interviewRoutes = require("./Routes/interview.route");
dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.use(interviewRoutes);

app.listen(port, () => {
  console.log(`Server is running...http://localhost:${port}`);
});
