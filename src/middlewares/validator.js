const validator = (schema) => {
    return (req, res, next) => {
        Object.keys(schema).map(key => {
            const { error, value } = schema[key].validate(req[key], { stripUnknown: true });
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            req[key] = value;
        });
        next();
    }
}

export default validator;