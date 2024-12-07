const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.json({error: err});
}

module.exports = errorHandler;