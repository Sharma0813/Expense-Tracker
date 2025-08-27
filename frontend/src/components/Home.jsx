import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "@/redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "@/hooks/useGetExpenses";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();
  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };
  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-5">
          <h1>Expense</h1>
          <CreateExpense />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-lg">Filter By: </h1>
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Expense" />
            </SelectTrigger>
            <SelectContent className="sm:max-w-[425px] bg-white text-black">
              <SelectGroup>
                <SelectLabel value="expense">Expense</SelectLabel>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="grocerry">Grocerry</SelectItem>
                <SelectItem value="bills">Bill's & EMI's</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

           <Select onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent className="sm:max-w-[425px] bg-white text-black">
              <SelectGroup>
                <SelectLabel value="select">Select</SelectLabel>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ExpenseTable/>
      </div>
    </div>
  );
};

export default Home;
