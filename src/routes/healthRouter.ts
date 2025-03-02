import { Router } from "express"

const healthRouter = Router()

healthRouter.get("", (_, res) => res.send({
	status: "OK",
	message: "Server is running"
}))

export default healthRouter
