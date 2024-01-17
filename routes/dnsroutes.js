import { Router } from "express";
import { getRecord } from "../controller/dnscontroller.js";

let router = Router();
router.get("/", getRecord);

export default router;
