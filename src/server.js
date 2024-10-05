import express from "express";
import path from "path";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import connectDB from "./config/db.config.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", routes);

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route for the main page
app.get("/", (req, res) => {
    res.render("index");
});

app.get("*", (req, res) => {
    responseHelper.notFound(res, "Route not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();