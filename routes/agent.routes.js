import express from "express";
import { createAgent, getAgentInfoByID, getAllAgents, signin } from "../controllers/agent.controller.js";
const router = express.Router();


router.post("/",createAgent)
router.post("/signin",signin)
router.get("/",getAllAgents)
router.get("/:id",getAgentInfoByID)


export default router;
