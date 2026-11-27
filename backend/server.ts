import express from "express";
import cors from "cors";
import helmet from 'helmet'

// File routes
import router from "./routes/productRoutes.ts";
import limiter from "./middlewares/rateLimit.ts";

const app = express()
const PORT = process.env.PORT || 5050;

// middlewares
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", limiter, router);

app.listen(PORT, () => {
    console.log(`Server is listeneing on PORT:- ${PORT}`)
})