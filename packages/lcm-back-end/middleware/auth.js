import jwt from 'jsonwebtoken';

//module.exports
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                req.user = jwt.verify(token, process.env.SECRET_KEY);
                return next();
            } catch (e) {
                error.message = 'invalid/expired token';
                return next(error);
            }
        }
        error.message = 'authorization token must be Bearer [token]';
        return next(error);
    }
    error.message = 'authorization header must be provided';
    return next(error);
};

export default auth;
