// From: https://github.com/vitorpldev/elysia-fault/blob/master/src/helpers/errors.ts

export class APIError extends Error {
	constructor(
		message: string,
		public status: number,
		public name: string,
	) {
		super(message)
	}
}

export class BadRequest extends APIError {
	constructor(message: string) {
		super(message, 400, "BadRequest")
	}
}

export class Unauthorized extends APIError {
	constructor(message: string = "Invalid authentication credentials") {
		super(message, 401, "Unauthorized")
	}
}

export class PaymentRequired extends APIError {
	constructor(message: string = "Payment required to proceed") {
		super(message, 402, "PaymentRequired")
	}
}

export class Forbidden extends APIError {
	constructor(
		message: string = "Access denied due to insufficient permissions",
	) {
		super(message, 403, "Forbidden")
	}
}

export class NotFound extends APIError {
	constructor(message: string = "Requested resource not found") {
		super(message, 404, "NotFound")
	}
}

export class Conflict extends APIError {
	constructor(message: string = "Resource conflict occurred") {
		super(message, 409, "Conflict")
	}
}

export class Gone extends APIError {
	constructor(message: string = "Requested resource is no longer available") {
		super(message, 410, "Gone")
	}
}

export class LengthRequired extends APIError {
	constructor(message: string = "Content length is required") {
		super(message, 411, "LengthRequired")
	}
}

export class PreconditionFailed extends APIError {
	constructor(message: string = "Precondition for the request failed") {
		super(message, 412, "PreconditionFailed")
	}
}

export class UnsupportedMediaType extends APIError {
	constructor(message: string = "Unsupported media type") {
		super(message, 415, "UnsupportedMediaType")
	}
}

export class RequestRangeNotSatisfiable extends APIError {
	constructor(message: string = "Request range is not satisfiable") {
		super(message, 416, "RequestRangeNotSatisfiable")
	}
}

export class ExpectationFailed extends APIError {
	constructor(message: string = "Expectation failed") {
		super(message, 417, "ExpectationFailed")
	}
}

export class Teapot extends APIError {
	constructor(message: string = "I'm a teapot") {
		super(message, 418, "Teapot") // I'm a teapot (RFC 2324)
	}
}

export class MisdirectedRequest extends APIError {
	constructor(
		message: string = "The request was directed to an incorrect server",
	) {
		super(message, 421, "MisdirectedRequest")
	}
}

export class UnprocessableEntity extends APIError {
	constructor(
		message: string = "Request data is invalid or cannot be processed",
	) {
		super(message, 422, "UnprocessableEntity")
	}
}

export class UpgradeRequired extends APIError {
	constructor(
		message: string = "The server requires the client to upgrade to a newer version",
	) {
		super(message, 426, "UpgradeRequired")
	}
}

export class UnsupportedUpgrade extends APIError {
	constructor(
		message: string = "The server does not support the upgrade requested by the client",
	) {
		super(message, 427, "UnsupportedUpgrade")
	}
}

export class InvalidSSLCertificate extends APIError {
	constructor(message: string = "The client's SSL certificate is invalid") {
		super(message, 428, "InvalidSSLCertificate")
	}
}

export class TooManyRequests extends APIError {
	constructor(message: string = "Request limit exceeded") {
		super(message, 429, "TooManyRequests")
	}
}

export class RequestHeaderFieldsTooLarge extends APIError {
	constructor(message: string = "The request headers are too large") {
		super(message, 431, "RequestHeaderFieldsTooLarge")
	}
}
export class UnavailableForLegalReasons extends APIError {
	constructor(
		message: string = "The resource is unavailable due to legal reasons",
	) {
		super(message, 451, "UnavailableForLegalReasons")
	}
}

export class InternalServerError extends APIError {
	constructor(message: string = "Internal server error") {
		super(message, 500, "InternalServerError")
	}
}

export class GatewayTimeout extends APIError {
	constructor(
		message: string = "Timeout occurred while communicating with upstream server",
	) {
		super(message, 502, "GatewayTimeout")
	}
}

export class Unavailable extends APIError {
	constructor(message: string = "The server is currently unavailable") {
		super(message, 503, "Unavailable")
	}
}

export class DependencyTimeout extends APIError {
	constructor(
		message: string = "Timeout occurred while waiting for external dependency",
	) {
		super(message, 504, "DependencyTimeout")
	}
}

export class VariantAlsoNegotiates extends APIError {
	constructor(
		message: string = "The server is capable of serving the request, but the client has indicated an alternate preference",
	) {
		super(message, 506, "VariantAlsoNegotiates")
	}
}

export class InsufficientStorage extends APIError {
	constructor(
		message: string = "The server does not have sufficient storage available to fulfill the request",
	) {
		super(message, 507, "InsufficientStorage")
	}
}

export class LoopDetected extends APIError {
	constructor(
		message: string = "An infinite loop has been detected in the request",
	) {
		super(message, 508, "LoopDetected")
	}
}
