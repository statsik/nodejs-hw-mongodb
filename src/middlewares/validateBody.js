import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.validateAsync(req.body, {
            abortEarly: false,
            convert: false,
            allowUnknown: false
        });
        req.body = validatedData;
        next();
    } catch (err) {
        const errorMessage = err.details.map(detail => ({
            ...detail,
            message: detail.message.replace(/"/g, '') + '\n' 
        }));
        next(createHttpError(400, {
            //message: "Validation Error",
            //errors: formattedErrors,
            //message: err.message.replace(/"/g, ''),
            message: errorMessage,
            errors: err.details, 
        }));
    }
};