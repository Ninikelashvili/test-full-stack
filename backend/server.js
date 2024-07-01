const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 9000;
const connectDB = require("./config/db");
const tableRoutes = require("./routes/tableRoutes");
const bodyParser = require("./middleware/tableMiddleware");

connectDB();
const app = express();

bodyParser(app);

app.use(cors());

app.use("/api/tables", tableRoutes);

app.listen(port, () => console.log(`Server started port ${port}`));
