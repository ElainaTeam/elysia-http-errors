import { httpErrors, BadRequest } from "dist"
import Elysia from "elysia"

const app = new Elysia()
	.use(
		httpErrors(
			{
				mika: (code: number) => ({
					message: "a",
					status: code,
				}),
			},
			{
				custom: ({ error }) => ({
					name: error.name,
					message: error.message,
					code: error.status,
				}),
			},
		),
	)
	.get("/", ({ createError }) => {
		return createError("mika", 404)
	})
	.get("/test", () => {
		throw new BadRequest("This is a bad request.")
	})

app.listen(3000, (server) => {
	console.log(`> App đang chạy tại: ${server.url.origin}`)
})
