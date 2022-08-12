import { io } from "@/app"

const messages = []
io.on("connection", socket => {
	console.log(`User connected on socket ${socket.id}`)
	socket.on("message", data => {
		console.log(data)
		messages.push(data)
		socket.emit("message", messages)
	})
})
