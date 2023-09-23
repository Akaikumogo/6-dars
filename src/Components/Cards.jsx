/* eslint-disable react/prop-types */
import { useState } from "react";
import { deleteTodo, editAktive, save } from "../Store/todoSlice";
import { useDispatch } from "react-redux";

const Cards = ({ list }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const deleteFunction = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const editFunction = (id) => {
    dispatch(editAktive(id));
  };

  const saveFunction = (id, value) => {
    dispatch(save({ id, value }));
    setValue("");
  };

  return (
    <div className="w-full p-2">
      <div className="w-[400px] mx-auto border gap-3 rounded-lg bg-blue-200 px-4 py-4">
        {list.length !== 0 ? (
          list.map((item) => (
            <div
              className="w-full flex gap-1 justify-between m-auto"
              key={item.id}
            >
              {!item.isEditing ? (
                <>
                  <h1 className="w-auto">{item.title}</h1>

                  <div className="w-[100px] flex gap-3">
                    <button onClick={() => deleteFunction(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => editFunction(item.id)}>Edit</button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    className="w-full border"
                    defaultValue={item.title}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                  />
                  <button
                    onClick={() =>
                      saveFunction(item.id, value !== "" ? value : item.title)
                    }
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No todo here</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
