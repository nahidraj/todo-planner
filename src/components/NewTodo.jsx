import React from "react";
import { useEffect } from "react";
import { TodoListByStatus } from "../Api/api";
import { useSelector } from "react-redux";
import { DeleteAlert, UpdateAlert } from "../helper/AlertHelper";

const NewTodo = () => {
  useEffect(() => {
    TodoListByStatus("New");
  }, []);

  const newTodos = useSelector((state) => state.todos.New);

  const handleDelete = (id) => {
    DeleteAlert(id).then((result) => {
      if (result) {
        TodoListByStatus("New");
      }
    });
  };

  const handleUpdate = (id, status) => {
    UpdateAlert(id, status).then((result) => {
      if (result) {
        TodoListByStatus("New");
      }
    });
  };

  return (
    <form>
      <div className="max-w-full mx-auto bg-white p-6">
        <div className="mb-3">
          <h3 className="font-roboto font-bold text-2xl mb-6">New ToDo</h3>
        </div>
        {newTodos.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 flex-wrap">
            {newTodos.map((item, i) => {
              return (
                <div key={i} className="p-6 rounded bg-green-400 bg-opacity-40">
                  <h4 className="font-roboto font-bold text-xl text-black mb-4">
                    {item.title}
                  </h4>
                  <p className="font-roboto text-base leading-[26px]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex gap-5 items-center justify-between">
                    <div className="flex gap-5 items-center">
                      <button
                        onClick={() => handleUpdate(item._id, item.status)}
                        type="button"
                        className="py-2 px-3 rounded w-full bg-green-600 text-sm text-white font-roboto font-normal"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        className="py-2 px-3 rounded w-full bg-red-500 text-sm text-white font-roboto font-normal"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="font-roboto font-medium text-base leading-[26px]">
                      {item.createdDate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="font-roboto text-lg font-normal">No Todos Found</h1>
        )}
      </div>
    </form>
  );
};

export default NewTodo;
