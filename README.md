# Elysia HTTP Errors

Errors handler for ElysiaJS

## 1. Installation

```bash
bun add elysia-http-errors
```

## 2. Usage
> [!NOTE]  
> Must be used before controllers or anything that will need to have error handling.

```js
import { httpErrors, Errors } from "elysia-http-errors"
import Elysia from "elysia"

const app = new Elysia()
	.use(
		httpErrors(
			{
				LoginRequired: (code: number) => ({
					message: "Please login before request this.",
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
		return createError("LoginRequired", 401)
	})
    .get("/test", () => {
		throw new Errors.BadRequest('This is a bad request.')
	})

app.listen(5500, (server) => {
	console.log(`> Server is running at: ${server.url.origin}`)
})
```

> [!NOTE]  
> Alway return `createError` when you want to create error.
> ```js
> // Correct:
> app.get("/", ({ createError }) => {
> 	return createError("LoginRequired", 401)
> })
> // Not this:
> app.get("/", ({ createError }) => {
> 	createError("LoginRequired", 401)
> })
> ```

## 3. Customize Errors.
- Need more customiziation? You can extends `APIError` class.
```js
import { Errors, httpError } from "elysia-http-errors"
import Elysia from "elysia"

export class CustomError extends Errors.APIError {
    constructor(message: string) {
        super(message, 400, 'YourCustomError')
    }
}

const app = new Elysia()
    .use(
		httpErrors(
			{
				CustomError: () => {
                    throw new CustomError('CustomMessage')
                }
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
		return createError("CustomError")
	})
    .get("/test", () => {
		throw new CustomError('This is a bad request.')
	})
```