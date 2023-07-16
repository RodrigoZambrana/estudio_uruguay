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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStudentAll = exports.getUserAll = exports.deleteUser = exports.updateUser = exports.createUser = exports.existUser = exports.getUserById = exports.loginUser = exports.loginAdmin = void 0;
const data_source_1 = require("../../data-source");
const User_1 = require("../../entity/common/User");
const auth_1 = require("../../config/auth");
const adminRepository = data_source_1.AppDataSource.getRepository(User_1.User);
//ALTA, BAJA, MODIFICACION, EXISTENCIA, OBTENER
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const admin = yield data_source_1.AppDataSource.createQueryBuilder()
            .select("user")
            .from(User_1.User, "user")
            .where("user.userType = 'admin' AND user.email = :email", {
            email: email,
        })
            .getOne();
        if (admin &&
            req.body.password ==
                admin.password /*&& bcrypt.compareSync(req.body.password, admin.password)*/) {
            const token = (0, auth_1.signInToken)(admin);
            res.json({
                token,
                id: admin.id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                contactNumber: admin.contactNumber,
                email: admin.email,
                userType: admin.userType,
            });
        }
        else {
            res.status(401).json({
                message: "Invalid Admin or password, or you are not an admin!",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.loginAdmin = loginAdmin;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body.email;
        const admin = yield data_source_1.AppDataSource.createQueryBuilder()
            .select("user")
            .from(User_1.User, "user")
            .where("user.email = :email", { email: email })
            .getOne();
        if (admin /*&& bcrypt.compareSync(req.body.password, admin.password)*/) {
            const token = (0, auth_1.signInToken)(admin);
            res.json({
                token,
                id: admin.id,
                name: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                UserType: admin.userType,
            });
        }
        else {
            res.status(401).json({
                message: "Invalid Admin or password!",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.loginUser = loginUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.body.id);
        const user = yield User_1.User.findOneBy({ id: id });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.getUserById = getUserById;
const existUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield adminRepository
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();
        if (user != undefined)
            res.json(true);
        else
            res.json(false);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.existUser = existUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User();
    console.log(req.body.email);
    user.email = String(req.body.email);
    user.userName = String(req.body.userName);
    user.firstName = String(req.body.firstName);
    user.activationEndDate = new Date(String(req.body.activationEndDate));
    user.activationStartDate = new Date(String(req.body.activationStartDate));
    user.contactNumber = String(req.body.contactNumber);
    user.lastName = String(req.body.lastName);
    //user.password = bcrypt.hashSync(password, saltRounds);
    user.password = String(req.body.password);
    if (String(req.body.userType).match("teacher"))
        user.userType = User_1.UserType.TEACHER;
    else if (req.body.userType.match("user"))
        user.userType = User_1.UserType.USER;
    else if (req.body.userType.match("admin"))
        user.userType = User_1.UserType.ADMIN;
    try {
        yield user.save();
        res.json(true);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("prueba fecha" + req.body.activationEndDate);
        yield adminRepository
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            email: String(req.body.email),
            firstName: String(req.body.firstName),
            activationEndDate: new Date(req.body.activationEndDate),
            activationStartDate: new Date(String(req.body.activationStartDate)),
            contactNumber: String(req.body.contactNumber),
            lastName: String(req.body.lastName),
            password: String(req.body.password),
            userType: User_1.UserType.ADMIN,
            userName: String(req.body.userName),
        })
            .where("id = :idIn", { idIn: Number(req.body.id) })
            .execute();
        res.json(true);
    }
    catch (error) {
        res.json(false);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idIn = Number(req.body.id);
    try {
        yield adminRepository
            .createQueryBuilder()
            .delete()
            .from(User_1.User)
            .where("id = :idIn", { idIn: idIn })
            .execute();
        res.json(true);
    }
    catch (error) {
        res.json(false);
    }
});
exports.deleteUser = deleteUser;
const getUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.find();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.getUserAll = getUserAll;
const getUserStudentAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*
        await adminRepository
          .createQueryBuilder("user")
          .where("userType = :userTypeIn", { userTypeIn: UserType.USER })
          .getMany();
          */
        const user = yield User_1.User.findBy({ userType: User_1.UserType.USER });
        res.json(user);
    }
    catch (error) {
        res.json(false);
    }
});
exports.getUserStudentAll = getUserStudentAll;
module.exports = {
    getUserById: exports.getUserById,
    createUser: exports.createUser,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
    existUser: exports.existUser,
    getUserAll: exports.getUserAll,
    loginAdmin: exports.loginAdmin,
    loginUser: exports.loginUser,
    getUserStudentAll: exports.getUserStudentAll,
};
//# sourceMappingURL=userController.js.map