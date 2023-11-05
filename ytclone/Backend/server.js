const express = require("express")
const mongoose= require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv")

const userRoutes = require("./routes/users")
const videoRoutes = require("./routes/videos")
const commentRoutes = require("./routes/comments")
const authRoutes = require("./routes/auth")

const cookieParser = require("cookie-parser");

const app = express()

dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };


const connect=() =>{
    mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to db");
    }
    ).catch((err)=>{
        throw err;
    })
};


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser())
app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth",authRoutes)

//error handling

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success :false,
        status,
        message

    })
})

app.listen(7050,()=>{
    connect()
    console.log("connected to server");
})

