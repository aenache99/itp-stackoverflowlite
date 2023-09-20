function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Something went wrong!'
        }
    });
}

module.exports = errorHandler;
