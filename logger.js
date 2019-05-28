function logger(req, res, next) {
    console.log("logging again...")
    next();
};

module.exports = logger;