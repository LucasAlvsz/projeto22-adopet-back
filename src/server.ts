import { serverHttp } from "@/app"
import "@/controllers/chatController"

serverHttp.listen(process.env.PORT || 5000, () =>
	console.log(`Server running on port ${process.env.PORT || 5000} 🐱‍👤`)
)
