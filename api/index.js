// initialize expresss app
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const conversationRoute = require("./routes/conversations");
const multer = require("multer");
const path = require("path");

// config env variables
dotenv.config();

//connect to mongo db
console.log(process.env.MONGO_URL);
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.8d0zv.mongodb.net/social?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//midlleware
app.use(express.json()); //body parser for body requests
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer(storage);
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(errr);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

// app.get("/", (requset, res) => {
//   res.send("welcome to homepage ");
// });

// app.get("/users", (requset, res) => {
//   res.send("welcome to users page  ");
// });

// specify listening port
app.listen(8800, () => {
  console.log("Backend server is running ");
});
