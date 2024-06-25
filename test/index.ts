import { httpErrors } from "dist"
import Elysia from "elysia"

const app = new Elysia()
	.use(httpErrors({ mika: (code: number) => ({ code }) }))
	.get("/", ({ createError }) => {
		createError("mika", 404)
	})

app.listen(3000)
