import createHttpError from "http-errors";

export const validateBody = (schema) => async(req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (err) {
        const formattedErrors = err.details.map(detail => ({
            field: detail.path[0], 
            message: detail.message,
            type: detail.type, 
            context: detail.context 
          }));
        const error = createHttpError(400, "Validation Error", {
            errors: formattedErrors,
        });
        next(error);
    }
}