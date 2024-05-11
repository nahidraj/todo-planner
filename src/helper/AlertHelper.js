import Swal from "sweetalert2";
import { DeleteTodo, UpdateTodo } from "../Api/api";

export function DeleteAlert(id) {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return DeleteTodo(id).then((result) => {
        if (result) {
          return result;
        }
      });
    }
  });
}

export function UpdateAlert(id, status) {
  return Swal.fire({
    title: "Update ToDo Status?",
    input: "select",
    inputOptions: {
      Progress: "Progress",
      Completed: "Completed",
      New: "New",
      Canceled: "Canceled",
    },
    inputValue: status,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return UpdateTodo(id, result.value).then((result) => {
        if (result) {
          return result;
        }
      });
    }
  });
}
