import { Expense } from "../models/expense.model.js";

// Add New Expense
export const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id;

    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const expense = await Expense.create({
      description,
      amount,
      category,
      userId,
    });

    return res.status(201).json({
      message: "New Expense Added",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get All Expenses
export const getAllExpense = async (req, res) => {
  try {
    const userId = req.id;
    const category = req.query.category || "";
    const done = req.query.done || "";

    const query = { userId };

    if (category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }

    const expenses = await Expense.find(query);

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        message: "No expense found",
        success: false,
      });
    }

    return res.status(200).json({
      expenses,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//  Mark as Done or Undone (Toggle)
export const markAsDoneUndone = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found.",
        success: false,
      });
    }

    // Toggle done
    expense.done = !expense.done;
    await expense.save();

    // Get updated list
    const expenses = await Expense.find({ userId: req.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: `Expense marked as ${expense.done ? "done" : "undone"}.`,
      expenses,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Delete Expense
export const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);

    return res.status(200).json({
      message: "Expense removed",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expenseId = req.params.id;

    const updateData = { description, amount, category };

    const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Expense Updated",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
