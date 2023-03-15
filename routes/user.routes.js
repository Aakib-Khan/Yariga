import express from "express";

import {
    createUser,
    getAllUsers,
    getUserInfoByID,
} from "../controllers/user.controller.js";

const router = express.Router();

// router.route("/").get(getAllUsers);
// router.route("/").post(createUser);
// router.route("/:id").get(getUserInfoByID);

router.get("/",getAllUsers)
router.post("/",createUser)
router.get("/:id",getUserInfoByID)

export default router;
