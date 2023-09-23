import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTood, filterFunction } from "./Store/todoSlice";
import Cards from "./Components/Cards";
const App = () => {
  const [inpValue, setInpValue] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const list = useSelector((state) =>
    isAdd ? state.todo.list : state.todo.searchedTodo
  );
  console.log(list);

  const addtodoFunc = (value) => {
    dispatch(addTood({ value }));
    setInpValue("");
  };
  const searchOradd = () => {
    isAdd ? (setIsAdd(!isAdd), searchTodoFunc(inpValue)) : setIsAdd(!isAdd);
  };
  const searchTodoFunc = (value) => {
    dispatch(filterFunction({ value }));
  };
  const dispatch = useDispatch();
  return (
    <div className="w-full m2 ">
      <div className="bg-blue-100 w-[400px] m-auto py-2 px-4 items-center mb-[10px] mt-[100px] h-[50px] border  flex justify-between  rounded-xl">
        <button
          className="w-[360px] mx-auto border flex items-center rounded-lg bg-green-500 border-green-500 px-[130px] text-center py-2 h-[30px]  hover:bg-green-600"
          onClick={() => searchOradd()}
        >
          {isAdd ? "Go to search " : "Go to add"}
        </button>
      </div>
      <div className="bg-blue-100 m-auto py-2 px-4 items-center mb-[10px] h-[100px] border w-[400px] flex justify-between rounded-xl">
        <input
          className="border mx-auto border-black rounded-sm h-[20px] w-[300px]"
          onChange={(e) => (
            setInpValue(e.target.value), !isAdd ? searchTodoFunc(inpValue) : ""
          )}
          value={inpValue}
          placeholder={isAdd ? "Add new title" : "Search by title"}
          type="text"
        />
        {isAdd ? (
          <button
            className={
              " w-100px border flex items-center rounded-lg bg-green-500 border-green-500 px-3 text-center py-2 h-[30px]  hover:bg-green-600"
            }
            onClick={() => {
              addtodoFunc(inpValue);
            }}
          >
            Add
          </button>
        ) : (
          ""
        )}
      </div>
      <Cards list={list} />
    </div>
  );
};

export default App;
