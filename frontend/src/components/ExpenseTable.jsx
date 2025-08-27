import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import axios from "axios";
import { setExpenses } from "../redux/expenseSlice";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import CreateExpense from "./CreateExpense";

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const { expenses = [] } = useSelector((state) => state.expense || {});
  const [editExpense, setEditExpense] = useState(null);

  const handleCheckboxChange = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/${id}/done`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setExpenses(res.data.expenses));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to toggle done.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/expense/remove/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const getRes = await axios.get(
          "http://localhost:8000/api/v1/expense/getall",
          { withCredentials: true }
        );
        dispatch(setExpenses(getRes.data.expenses));
        toast.success("Expense deleted");
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const total = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Done</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={expense.done}
                      onCheckedChange={() => handleCheckboxChange(expense._id)}
                    />
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>
                    {expense.createdAt
                      ? new Date(expense.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => setEditExpense(expense)}
                      className="p-1 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="p-1 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              {/* Total Row */}
              <TableRow className="bg-muted">
                <TableCell colSpan={4} className="font-bold text-lg text-left">
                  Total
                </TableCell>
                <TableCell colSpan={2} className="font-bold text-lg text-right">
                  ₹{total}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      {editExpense && (
        <CreateExpense
          isEditMode={true}
          existingData={editExpense}
          onClose={() => setEditExpense(null)}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
