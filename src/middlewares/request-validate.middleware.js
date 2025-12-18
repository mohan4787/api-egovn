
const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = req.body;

            if (!data) {
                return next({
                    code: 422,
                    message: "Empty payload",
                    status: "UNPROCESSABLE_ENTITY"
                });
            }

            await schema.validateAsync(data, { abortEarly: false });
            next();
        } catch (exception) {
            let messageBag = {};

            if (exception.details) {
                exception.details.forEach((error) => {
                    let key = error.path.pop();
                    messageBag[key] = error.message;
                });
            }

            next({
                code: 400,
                detail: messageBag,
                message: "Validation Failed",
                status: "VALIDATION_FAILED"
            });
        }
    };
};

module.exports = {bodyValidator};
