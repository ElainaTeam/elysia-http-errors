import { Elysia, NotFoundError, ValidationError } from "elysia"
import type { MaybePromise } from "elysia"
import * as Errors from "./errors"

export type ErrorParams<T extends Error = Error> = {
	request: Request
	error: T
}

export type ErrorPayload = {
	status: number
	name: string
	message: string
}

export type ErrorPayloadType =
	| ErrorPayload
	| ((...args: any[]) => MaybePromise<ErrorPayload | never>)
export type ErrorType = { [x: string]: ErrorPayloadType }

export type HttpErrorsOptions = {
	notfound?: (request: Request) => object | string
	custom?: (params: ErrorParams<Errors.APIError>) => object | string
	vaildation?: (params: ErrorParams<ValidationError>) => object | string
	unexpected?: (params: ErrorParams) => object | string
}

export function httpErrors<T extends ErrorType>(
	errors: T,
	options: HttpErrorsOptions = {},
) {
	const plugin = new Elysia({ name: "elysia-http-errors" }).error({
		API_ERROR: Errors.APIError,
	})

	plugin.onError({ as: "global" }, ({ error, request, set }) => {
		if (error instanceof NotFoundError) {
			if (options.notfound) {
				const payload = options.notfound(request)

				if (typeof payload === "string") {
					return new Response(payload, {
						status: 404,
						headers: set.headers,
					})
				}

				return Response.json(payload, {
					status: 404,
					headers: set.headers,
				})
			}

			return Response.json(
				{
					name: "NotFoundError",
					message:
						error.message === "NOT_FOUND"
							? `404: Not Found`
							: error.message,
				},
				{
					status: 404,
					headers: set.headers,
				},
			)
		}

		if (error instanceof ValidationError) {
			if (options.vaildation) {
				const payload = options.vaildation({ request, error })

				if (typeof payload === "string") {
					return new Response(payload, {
						status: 400,
						headers: set.headers,
					})
				}

				return Response.json(payload, {
					status: 400,
					headers: set.headers,
				})
			}

			return Response.json(error, {
				status: 400,
				headers: set.headers,
			})
		}

		if (error instanceof Errors.APIError) {
			if (options.custom) {
				const payload = options.custom({ request, error })

				if (typeof payload === "string") {
					return new Response(payload, {
						status: error.status,
						headers: set.headers,
					})
				}

				return Response.json(payload, {
					status: error.status,
					headers: set.headers,
				})
			}
		}

		if (options.unexpected) {
			const payload = options.unexpected({ request, error })

			if (typeof payload === "string") {
				return new Response(payload, {
					status: 500,
					headers: set.headers,
				})
			}

			return Response.json(payload, { status: 500, headers: set.headers })
		}

		return Response.json(
			{
				message: error.message,
				name: error.name,
			},
			{
				status: 500,
				headers: set.headers,
			},
		)
	})

	type DecorateFunctionArgs<K extends keyof typeof errors> =
		(typeof errors)[K] extends (
			...args: any[]
		) => MaybePromise<ErrorPayload | never>
			? Parameters<(typeof errors)[K]>
			: never[]

	const decorateFn = async <K extends keyof typeof errors>(
		name: K,
		...args: DecorateFunctionArgs<K>
	) => {
		const errorPayload: ErrorPayloadType = errors[name]

		if (typeof errorPayload === "function") {
			const payload = await errorPayload(...args)

			throw new Errors.APIError(
				payload.message,
				payload.status,
				payload.name,
			)
		}

		throw new Errors.APIError(
			errorPayload.message,
			errorPayload.status,
			errorPayload.name,
		)
	}

	return plugin.decorate("createError", decorateFn)
}

export { Errors }