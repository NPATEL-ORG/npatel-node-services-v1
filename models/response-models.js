import { responseObject } from "../configs/response-config.js"

export const generalResponseModel = (payload) => {
    let payloadClone = {...payload}
    delete payloadClone.code
    return {
        bucket: payloadClone,
        code: payload.code,
        msg: responseObject.filter( obj => obj.code == payload.code)[0]?.msg || payload.msg
    }
}