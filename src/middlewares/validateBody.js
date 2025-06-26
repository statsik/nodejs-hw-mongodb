import createHttpError from "http-errors";

export const validateBody = (schema) => async(req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        const errorMessages = err.details.map(detail => {
            return detail.message;
        });
        const error = createHttpError(400, err, {
            errors: err.details,
            data: errorMessages
            
        });
        next(error);
    }
}