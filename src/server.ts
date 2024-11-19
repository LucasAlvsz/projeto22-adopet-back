import app from "@/app"
import "@/websocket"

app.listen(process.env.PORT || 5000, () =>
	console.log(`Server running on port ${process.env.PORT || 5000} 🐱‍👤`)
)
