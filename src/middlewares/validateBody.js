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
        // const formattedErrors = err.details.map(detail => ({
        //     field: detail.path.join('.'),
        //     message: detail.message.replace(/"/g, ''), 
        // }));

        next(createHttpError(400, {
            //message: "Validation Error",
            //errors: formattedErrors,
            errors: err.details.message.replace(/"/g, ''),
        }));
    }
};