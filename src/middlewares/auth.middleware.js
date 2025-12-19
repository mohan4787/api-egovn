// src/middlewares/auth.middleware.js
const { AppConfig } = require("../config/config");
const { USER_ROLES } = require("../config/constants");
const authSvc = require("../modules/auth/auth.service");
const userSvc = require("../modules/user/user.service"); // make sure this exists
const jwt = require("jsonwebtoken");

// Middleware to check if user is logged in
const loginCheck = async (req, res, next) => {
    try {
        let token = req.headers["authorization"] || null;
        if (!token) {
            return next({
                code: 401,
                message: "Unauthorized Access",
                status: "UNAUTHORIZED"
            });
        }
        token = token.replace("Bearer ", "");
        
        const authData = await authSvc.getSingleRowByFilter({
            maskedAccessToken: token
        });
        if (!authData) {
            return next({
                code: 401,
                message: "Token not found",
                status: "UNAUTHORIZED_TOKEN"
            });
        }

        const data = jwt.verify(authData.accessToken, AppConfig.jwtSecret);

        if (data.type !== "Bearer") {
            return next({
                code: 401,
                message: "Bearer token expected",
                status: "UNAUTHORIZED_TOKEN"
            });
        }

        let userDetail = await userSvc.getUserPublicProfile(
            await userSvc.getSingleUserByFilter({ _id: data.sub })
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
        next(exception);
    }
};

// Middleware to check permission based on role
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
