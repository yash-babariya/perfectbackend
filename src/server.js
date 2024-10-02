import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import connectDB from "./config/db.config.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("uploads"));
app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();