import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import router from "@/routes"
import axios from "axios"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Authorization"],
		credentials: true,
	},
})

app.post("/", (req, res) => {
	axios
		.post(
			"https://api.imgbb.com/1/upload",
			{
				image: req.body,
			},
			{
				headers: {
					key: "1f23f7ea194499ef2613067439ec958c",
				},
			}
		)
		.then(({ data }) => {
			res.send(data)
		})
		.catch(err => {
			console.error(err)
			res.sendStatus(500)
		})
})

app.get("/", (req, res) => res.send("Hello World!"))

export { serverHttp, io }
