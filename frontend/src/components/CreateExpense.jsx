import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";

const CreateExpense = ({
  isEditMode = false,
  existingData = null,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && existingData) {
      setFormData({
        description: existingData.description,
        amount: existingData.amount,
        category: existingData.category,
      });
    }
  }, [isEditMode, existingData]);

  useEffect(() => {
    if (!isOpen && !isEditMode) {
      setFormData({ description: "", amount: "", category: "" });
    }
  }, [isOpen, isEditMode]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditMode
        ? `http://localhost:8000/api/v1/expense/update/${existingData._id}`
        : `http://localhost:8000/api/v1/expense/add`;

      const method = isEditMode ? axios.put : axios.post;

      const res = await method(url, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        const getRes = await axios.get(
          "http://localhost:8000/api/v1/expense/getall",
          {
            withCredentials: true,
          }
        );

        dispatch(setExpenses(getRes.data.expenses));
        toast.success(isEditMode ? "Expense updated!" : "Expense added!", {
          position: "bottom-center",
        });

        handleClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="outline">
            Add New Expense
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Expense" : "Add Expense"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the selected expense."
              : "Create a new expense. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description 📃"
                value={formData.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="₹Amount 💰"
                type="number"
                value={formData.amount}
                onChange={changeEventHandler}
              />
            </div>
          </div>

          <Select
            value={formData.category}
            onValueChange={changeCategoryHandler}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="grocerry">Grocerry</SelectItem>
                <SelectItem value="bills">Bill's & EMI's</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DialogFooter>
            {loading ? (
              <Button disabled className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {isEditMode ? "Update" : "Save"} Expense
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
