const responseHelper = {
    success: (res, message, data, statusCode = 200) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },
    error: (res, message, statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    validationError: (res, message, statusCode = 400) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    notFound: (res, message, statusCode = 404) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    unauthorized: (res, message, statusCode = 401) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    forbidden: (res, message, statusCode = 403) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    badRequest: (res, message, statusCode = 400) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    internalServerError: (res, message, statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    conflict: (res, message, statusCode = 409) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    tooManyRequests: (res, message, statusCode = 429) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    serviceUnavailable: (res, message, statusCode = 503) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
    gatewayTimeout: (res, message, statusCode = 504) => {
        res.status(statusCode).json({
            success: false,
            message,
        });
    },
};

export default responseHelper;
