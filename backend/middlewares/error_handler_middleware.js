const errorHandler = (err, req, res, next) => {
    
    res.json({error: err});
}

module.exports = errorHandler;