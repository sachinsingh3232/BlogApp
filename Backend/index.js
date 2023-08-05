import express from 'express'
import postRoute from './Routes/postsRoute.js'
import authRoute from './Routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}));

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);


app.listen(PORT, () => {
    console.log("Connected to backend !")
})
