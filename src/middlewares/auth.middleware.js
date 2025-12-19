const { AppConfig } = require("../config/config");
const { USER_ROLES } = require("../config/constants");
const userSvc = require("../modules/user/user.service");
const jwt = require("jsonwebtoken");

const loginCheck = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            return next({
                code: 401,
                message: "Token not found",
                status: "UNAUTHORIZED_TOKEN"
            });
        }

        token = token.replace("Bearer ", "");

        const decoded = jwt.verify(token, AppConfig.jwtSecret);

        if (decoded.type !== "Bearer") {
            return next({
                code: 401,
                message: "Bearer token expected",
                status: "UNAUTHORIZED_TOKEN"
            });
        }

        const userDetail = await userSvc.getUserPublicProfile(
            await userSvc.getSingleUserByFilter({ _id: decoded.sub })
        );

        if (!userDetail) {
            return next({
                code: 403,
                message: "User not found",
                status: "USER_NOT_FOUND"
            });
        }

        req.loggedInUser = userDetail;
        next();
    } catch (exception) {
        if (exception.name === "JsonWebTokenError") {
            return next({
                code: 401,
                message: "Invalid token",
                status: "UNAUTHORIZED_TOKEN"
            });
        } else if (exception.name === "TokenExpiredError") {
            return next({
                code: 401,
                message: "Token expired",
                status: "TOKEN_EXPIRED"
            });
        }
        next(exception);
    }
};

const checkPermission = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.loggedInUser) {
            return next({
                code: 403,
                message: "User not authenticated",
                status: "FORBIDDEN"
            });
        }

        if (!allowedRoles.includes(req.loggedInUser.role)) {
            return next({
                code: 403,
                message: "Access denied",
                status: "ACCESS_DENIED"
            });
        }

        next();
    };
};

module.exports = {
    loginCheck,
    checkPermission
};
