import express from "express";

import {
    createProperty,
    deleteProperty,
    getAllProperties,
    getPropertyDetail,
    updateProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/",createProperty);
router.get("/",getAllProperties);
router.get("/:id",getPropertyDetail);
router.patch("/:id",updateProperty);
router.delete("/:id",deleteProperty);

export default router;
