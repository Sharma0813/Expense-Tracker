import express from "express";
import { addExpense, getAllExpense, markAsDoneUndone, removeExpense, updateExpense } from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addExpense);
router.route("/getall").get(isAuthenticated, getAllExpense);
router.route("/remove/:id").delete(isAuthenticated, removeExpense);
router.route("/update/:id").put(isAuthenticated, updateExpense);
router.route("/:id/done").put(isAuthenticated, markAsDoneUndone);

export default router;
