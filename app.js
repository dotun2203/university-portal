const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/coursesRoutes");
const timetableRoute = require("./routes/timetableRoute");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

// ROUTES

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/timetable", timetableRoute);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.post("/user", (req, res) => {
//   res.send("got a post request");
// });

// app.get("/", userController.getAllUsers);

module.exports = app;
