import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";

const useGetExpenses = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((store) => store.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const params = {};
        if (category) params.category = category;
        if (markAsDone) params.done = markAsDone;

        const res = await axios.get("http://localhost:8000/api/v1/expense/getall", {
          params,
          withCredentials: true, 
        });

        if (res.data.success) {
          dispatch(setExpenses(res.data.expense));
        }
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;
