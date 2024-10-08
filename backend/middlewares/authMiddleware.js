// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user_id) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = isAuthenticated;
