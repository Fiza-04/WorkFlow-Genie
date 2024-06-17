require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./utils/index.js");
const userRoutes = require("./routes/user.routes.js");
const projectRoutes = require("./routes/project.routes.js");
const taskRoutes = require("./routes/task.routes.js");

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => console.log(`Server listening on port -> ${PORT}`));
