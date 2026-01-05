import express from "express";
import "dotenv/config";
import connectDB from "./src/dbconnection/connectDB.js";
import cors from "cors";


//Routers
import JobRoutes from "./src/routes/job.routes.js"
import UserRoutes from "./src/routes/user.route.js";


const PORT = process.env.PORT || 3001;
const origin = process.env.CORS_ORIGINS;
const app = express();

app.use(
  cors({
    origin: origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/job", JobRoutes);
app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("<h2> Hellow Gobinda your job dasbord is running</h2>");
});


//connect Database and server Starting
connectDB()
  .then(() => {
    console.log("Database connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on Port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("database connection faild ", error);
    process.exit(1);
  });
