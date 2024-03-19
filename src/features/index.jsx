import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../redux/TodoSlice";
import LogoIcon from "../icons/LogoIcon";

const Todo = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(getTodos);
  const [todoData, setTodoData] = useState({ title: "", description: "" });
  const [toolsView, setToolsView] = useState(false);
  const [updateTodoData, setUpdateTodoData] = useState({
    title: "",
    description: "",
  });
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [updatedDataIndex, setUpdatedDataIndex ] = useState(null)

  const handleInputChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const handleAddTodoClick = () => {
    dispatch(addTodo(todoData));
    setTodoData({ title: "", description: "" });
  };

  const showTools = () => {
    setToolsView(!toolsView);
  };

  const handleDeleteClick = (index) => {
    setShowUpdateInput(false)
    dispatch(deleteTodo(index));
    setTodoData({ title: "", description: "" });
    setUpdateTodoData({
      title: "",
      description: "",
    })
  };

  const handleUpdateClick = (todo, index) => {
    setShowUpdateInput(!showUpdateInput);
    setUpdatedDataIndex(index)
    setUpdateTodoData(todo)
  };

  const handleUpdateTodoChange = (e) => {
    setUpdateTodoData({ ...updateTodoData, [e.target.name]: e.target.value });
  };

  const updateTodoDataClick=()=>{
    setShowUpdateInput(false)
   dispatch(updateTodo({updateTodoData, updatedDataIndex}))
   setUpdateTodoData({
    title: "",
    description: "",
  })
  
  }

  console.log('-->>',updateTodoData, showUpdateInput);

  return (
    <>
    <div ><LogoIcon/></div>
      <section>
        {!showUpdateInput && (
          <div className="input-section">
            <div className="inputs">
              <input
                value={todoData.title}
                name="title"
                placeholder="Title..."
                onChange={(e) => handleInputChange(e)}
              />
              <input
                value={todoData.description}
                name="description"
                placeholder="Input..."
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="add-task-btn" onClick={handleAddTodoClick}>
              <button
                disabled={todoData.title === "" || todoData.description === ""}
                style={{
                  cursor:
                    todoData.title === "" || todoData.description === ""
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Add task
              </button>
            </div>
          </div>
        )}
        {showUpdateInput && (
          <div className="update-section">
            <div className="inputs">
              <input
                value={updateTodoData.title}
                name="title"
                placeholder="Title..."
                onChange={(e) => handleUpdateTodoChange(e)}
              />
              <input
                value={updateTodoData.description}
                name="description"
                placeholder="Input..."
                onChange={(e) => handleUpdateTodoChange(e)}
              />
            </div>
            <div className="add-task-btn" onClick={updateTodoDataClick}>
              <button
                disabled={updateTodoData.title === "" || updateTodoData.description === ""}
                style={{
                  cursor:
                    updateTodoData.title === "" || updateTodoData.description === ""
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                update task
              </button>
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="todo-list-section">
          {todoList.map((todo, index) => (
            <div key={index} className="todo-card">
              <div className="todo-card-data">
                <span>{todo.title}</span>
                <span>{todo.description}</span>
              </div>
              {!toolsView && (
                <div className="todo-info-icon" onClick={showTools}>
                  <button>Info</button>
                </div>
              )}
              {toolsView && (
                <div className="todo-edit-delete-div" onClick={showTools}>
                  <button onClick={() => handleUpdateClick(todo, index)}>Edit</button>
                  <button onClick={() => handleDeleteClick(index)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Todo;
