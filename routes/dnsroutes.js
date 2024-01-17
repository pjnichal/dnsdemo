import { Router } from "express";
import {
  deleteRecord,
  getRecord,
  saveRecord,
  updateRecord,
} from "../controller/dnscontroller.js";

let router = Router();
router.get("/:id", getRecord);
router.post("/", saveRecord);
router.patch("/", updateRecord);
router.delete("/:id", deleteRecord);
export default router;
