import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../slices/profileSlice";
import todoSlice from "../slices/todoSlice";
import todosSummerySlice from "../slices/todosSummery";

export default configureStore({
  reducer: {
    profile: profileSlice,
    todos: todoSlice,
    todoSummery: todosSummerySlice,
  },
});
