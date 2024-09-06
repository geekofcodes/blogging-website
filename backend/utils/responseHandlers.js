// Utility functions for handling API responses
exports.handleSuccess = (res, data, status = 200) => {
    return res.status(status).json({ success: true, data });
};

exports.handleError = (res, message, status = 500) => {
    return res.status(status).json({ success: false, message });
};
