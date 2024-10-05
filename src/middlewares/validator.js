import responseHelper from "../utils/responseHelper.js";

export default (schema) => {
    return (req, res, next) => {
        Object.keys(schema).map(key => {
            const { error, value } = schema[key].validate(req[key], { stripUnknown: true });
            if (error) {
                return responseHelper.badRequest(res, error.message);
            }
            req[key] = value;
        });
        next();
    }
}

