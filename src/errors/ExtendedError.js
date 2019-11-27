class ExtendedError extends Error {
    constructor(name, httpStatusCode = 500, context, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsefulError);
        }

        this.name = name;
        this.httpStatusCode = httpStatusCode;
        this.context = context;
        this.date = new Date();
    }
}

module.exports = ExtendedError;