"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controller/common/userController");
const router = (0, express_1.Router)();
router.post("/login", userController_1.loginAdmin);
//register a staff
router.get("/getUserById", userController_1.getUserById);
//login a admin
router.post("/createUser", userController_1.createUser);
//get a staff
router.put("/updateUser", userController_1.updateUser);
//delete a staff
router.delete("/deleteUser", userController_1.deleteUser);
//delete a staff
router.post("/existUser", userController_1.existUser);
router.get("/getAllUsers", userController_1.getUserAll);
router.get("/getAllUserStudentAll", userController_1.getUserStudentAll);
router.post("/loginUser", userController_1.loginUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map