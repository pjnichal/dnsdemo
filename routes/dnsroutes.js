import { Router } from "express";
import { getDns } from "../controller/dnscontroller.js";

let router = Router();
router.post("/dns", getDns);

export default router;
