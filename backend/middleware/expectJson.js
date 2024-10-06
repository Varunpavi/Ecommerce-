const expectJsonMiddleware = (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ 
            message: 'Unsupported Media Type. Please send JSON data.' 
        });
    }
    next();
};

export default expectJsonMiddleware;
