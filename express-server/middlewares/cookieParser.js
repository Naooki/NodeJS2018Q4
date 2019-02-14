module.exports = (req, res, next) => {
    if (req.parsedCookies) {
        return next();
    }
    
    const cookies = req.headers.cookie;
    if (!cookies) {
        return next();
    }
  
    req.parsedCookies = cookies;
    return next();
};
