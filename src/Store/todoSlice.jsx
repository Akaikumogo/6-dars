import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
    searchedTodo: [],
    lastarr: [],
  },
  reducers: {
    addTood: (state, action) => {
      return {
        ...state,
        list: [
          { title: action.payload.value, id: Date.now(), isEditing: false },
          ...state.list,
        ],
      };
    },
    filterFunction: (state, action) => {
      const { value } = action.payload;
      const { list } = state;

      let filtered = [...list];
      if (value.length > 0) {
        filtered = list.filter((str) => str.title.includes(value));
      }

      return {
        ...state,
        lastarr: filtered,
        searchedTodo:
          JSON.stringify(filtered) !== JSON.stringify(state.lastarr)
            ? filtered
            : list,
      };
    },
    deleteTodo: (state, action) => {
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };
    },
    editAktive: (state, action) => {
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload ? { ...item, isEditing: true } : item
        ),
      };
    },
    save: (state, action) => {
      const updatedList = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            title: action.payload.value,
            isEditing: false,
          };
        }
        return item;
      });

      return {
        ...state,
        list: updatedList,
      };
    },
  },
});

export const { addTood, filterFunction, deleteTodo, editAktive, save } =
  todoSlice.actions;
export default todoSlice.reducer;
