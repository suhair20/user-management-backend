import express from 'express'
import dotenv from 'dotenv'
dotenv .config();
import connectDB from './config/db.js';
import { notfound,errorHandler } from './middleware/errorMiddelware.js';
import userRoutes  from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
const port  =process.env.PORT||5000;



connectDB()

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/users',userRoutes)

app.use(notfound)
app.use(errorHandler)

app.get('/',(req,res)=>res.send('server is ready'))
 
app.listen(port,()=>console.log(`server started on port ${port}`))