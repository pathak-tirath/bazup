import express from "express";
import cors from "cors";
import helmet from 'helmet'
import router from "./routes/productRoutes";


const app = express()
const PORT = process.env.PORT || 5050;

// middlewares
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)

app.listen(PORT, () => {
    console.log(`Server is listeneing on PORT:- ${PORT}`)
})