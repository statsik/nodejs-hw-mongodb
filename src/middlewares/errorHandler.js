import { HttpError } from 'http-errors';

export const errorHandler = async (err, req, res, next) => {
    if (err.isJoi){
        return res.status(400).json({
            status: 400,
            message: "Something went wrong",
            data: err.message,
            details: err.details.map(({ path, message }) => ({
                path,
                message,
            })),
        });
    }

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
            data: err.message,
            //...(err.errors && { errors: err.errors })
        });
    }

    res.status(500).json({
        status: 500,
		message: "Something went wrong",
        data: err.message
    });
}