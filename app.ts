import express, { NextFunction, Request, Response } from 'express';
import { createServer } from "http"
import compression from "compression"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { MulterError } from 'multer';
import path from 'path';
import morgan from "morgan";
import { Storage } from '@google-cloud/storage';
import { connectDatabase } from './config/db';
import UserRoutes from "./routes/user.routes";
import CrmRoutes from "./routes/crm.routes";
import CompanyRoutes from "./routes/company.routes";
import BotRoutes from "./routes/bot.routes";
import { CreateWhatsappClient, getCurrentUser, userJoin, userLeave } from './utils/CreateWhatsappClient';
import { Server } from 'socket.io';


const app = express()
const server = createServer(app)


dotenv.config();
const PORT = Number(process.env.PORT) || 5000
const HOST = process.env.HOST || "http://localhost"
const ENV = process.env.NODE_ENV || "development"

connectDatabase()

app.use(express.json({ limit: '30mb' }))
app.use(cookieParser());
app.use(compression())

//logger
app.use(morgan('dev'))


let origin = ""
if (ENV === "development") {
    origin = "http://localhost:3000"
    let origin2 = "http://localhost:8081"
    app.use(cors({
        origin: [origin, origin2],
        credentials: true
    }))
}

if (ENV === "production") {
    if (process.env.ALPS_URL) {
        origin = process.env.ALPS_URL
        app.use(cors({
            origin: [origin],
            credentials: true
        }))
    }
}

let io: Server | undefined = undefined
io = new Server(server, {
    cors: {
        origin: origin,
        credentials: true
    }
});
io.on("connection", (socket: any) => {
    console.log("socket connected")
    socket.on('JoinRoom', async (id: string, path: string) => {
        console.log("running in room", id, path)
        const user = userJoin(id)
        socket.join(user.id)
        if (io)
            CreateWhatsappClient(id)
        socket.on("disconnect", (reason: string) => {
            let user = getCurrentUser(id)
            if (user)
                userLeave(user.id)
            console.log(`socket ${socket.id} disconnected due to ${reason}`);
        });
    })

});

const storage = new Storage({
    projectId: process.env.projectId,
    credentials: {
        type: process.env.type,
        private_key: process.env.private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        universe_domain: process.env.universe_domainv
    }
})

export const bucketName = String(process.env.bucketName)
export const bucket = storage.bucket(bucketName)




//routes
app.use("/api/v1", UserRoutes)
app.use("/api/v1", CompanyRoutes)
app.use("/api/v1", CrmRoutes)
app.use("/api/v1", BotRoutes)


//react app handler
if (ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "build/", "index.html"));
    })
}
else {
    app.use("*", (_req: Request, res: Response, _next: NextFunction) => {
        res.status(404).json({ message: "resource not found" })
    })
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof MulterError)
        return res.status(400).json({ message: "please select required no of files and field names" })
    res.status(500).json({
        message: err.message || "unknown  error occured"
    })
})

if (!PORT) {
    console.log("Server Port not specified in the environment")
    process.exit(1)
}
server.listen(PORT, () => {
    console.log(`running on ${HOST}:${PORT}`)
});

export {
    io
}