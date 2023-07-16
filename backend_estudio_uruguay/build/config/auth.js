"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = exports.tokenForVerify = exports.signInToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/common/User");
const signInToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.SERVER_TOKEN_SECRET, {
        expiresIn: '2d',
    });
};
exports.signInToken = signInToken;
const tokenForVerify = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        password: user.password,
    }, process.env.SERVER_TOKEN_ISSUER, { expiresIn: '15m' });
};
exports.tokenForVerify = tokenForVerify;
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.SERVER_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(404).json({
                        message: error,
                        error,
                    });
                }
                else {
                    res.locals.jwt = decoded;
                    next();
                }
            });
        }
    }
    catch (error) {
        res.status(401).send({
            message: error,
        });
    }
});
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield User_1.User.findOne({});
    if (admin) {
        next();
    }
    else {
        res.status(401).send({
            message: 'User is not Admin',
        });
    }
});
exports.isAdmin = isAdmin;
module.exports = {
    signInToken: exports.signInToken,
    tokenForVerify: exports.tokenForVerify,
    isAuth: exports.isAuth,
    isAdmin: exports.isAdmin,
};
//# sourceMappingURL=auth.js.map