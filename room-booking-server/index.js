import dotenv   from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRoutes from './route/index.route.js';
import { connectDB } from './config/db.js';
import roomRoutes from './route/room.route.js';

const app = express();
dotenv.config();

// Database Coonection
connectDB();

//Middleware
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());


//Routes
app.use("/api/index",indexRoutes);

app.use("/api/room",roomRoutes);

app.get("/",(req,res)=>{
    res.json({message:"Welcome... Try Different Endpoint"});
})



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})