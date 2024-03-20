import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    updateTodo: (state, action) => {
        const {updatedDataIndex, updateTodoData} = action.payload
        state.todos[updatedDataIndex] = updateTodoData
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (item, index) => index !== action.payload
      );
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const getTodos = (state) => state.todoSlice.todos;
