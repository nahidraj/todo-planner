import { useEffect } from "react";
import { TotalTodos } from "../Api/api";
import { useSelector } from "react-redux";

const Home = () => {
  useEffect(() => {
    TotalTodos();
  }, []);

  const allTodos = useSelector((state) => state.todoSummery.total);
  return (
    <div>
      <h3 className="font-roboto font-bold text-2xl mb-6">Todos Summery</h3>
      <div className="grid grid-cols-3 gap-5 flex-wrap">
        {allTodos.map((item,i) => (
          <div key={i} className="p-6 rounded bg-green-400 bg-opacity-40">
            <div>
              <h3 className="font-roboto font-semibold text-2xl mb-3">{item._id}</h3>
              <h3 className="font-roboto font-medium text-base mb-3">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
