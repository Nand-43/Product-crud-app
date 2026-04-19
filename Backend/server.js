import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./router/productRoutes.js";
import db from "./config/db.js";

dotenv.config();

const app = express();

db.connect()
.then(() => console.log("DB connected" , process.env.DB_HOST))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

async function initDb(){
    try{
      console.log("Database initialized successfully");
    }
    catch(error){
        console.log("Error initDB", error);
    }
}

app.listen(3000, () => {
    console.log("Server is running on  http://localhost:PORT/api/products ");
})