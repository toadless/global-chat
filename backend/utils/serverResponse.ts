// Own imports
import objectHash from "./objectHash"

// Export
export default function serverResponse(statusCode = 200, message = "", payload = {}) {
    const resPayload = {
        ...payload,
        statusCode: statusCode,
        message: message
    }
    return {
        statusCode: statusCode,
        message: message,
        payload: resPayload,
        payloadHash: objectHash(resPayload)
    }
}