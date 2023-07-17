import { Router } from "express";

import {
  getUserById,
  createUser,
  updateUser,
  getUserAll,
  loginAdmin,
  loginUser,
  deleteUser,
} from "../controller/userController";

const router = Router();

router.post("/login", loginAdmin);

router.get("/getUserById", getUserById);

router.post("/createUser", createUser);

router.put("/updateUser", updateUser);

router.delete("/deleteUser", deleteUser);

router.get("/users", getUserAll);

router.post("/loginUser", loginUser);

export default router;
