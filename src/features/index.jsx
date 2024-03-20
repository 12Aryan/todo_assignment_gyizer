import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../redux/TodoSlice";
import LogoIcon from "../icons/LogoIcon";
import ButtonField from "../components/buttonfield";
import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import CrossIcon from "../icons/CrossIcon";
import InfoIcon from "../icons/InfoIcon";

const Todo = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(getTodos);
  const [todoData, setTodoData] = useState({ title: "", description: "" });
  const [toolsView, setToolsView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateTodoData, setUpdateTodoData] = useState({
    title: "",
    description: "",
  });
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [updatedDataIndex, setUpdatedDataIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    setShowUpdateInput(false);
    dispatch(deleteTodo(deleteIndex));
    setTodoData({ title: "", description: "" });
    setUpdateTodoData({
      title: "",
      description: "",
    });
    setModalOpen(false);
  };

  const handleCrossClick = (index) => {
    setToolsView(false);
    setDeleteIndex(index)
    setModalOpen(true);
  };

  const handleUpdateClick = (todo, index) => {
    setShowUpdateInput(!showUpdateInput);
    setUpdatedDataIndex(index);
    setUpdateTodoData(todo);
  };

  const handleUpdateTodoChange = (e) => {
    setUpdateTodoData({ ...updateTodoData, [e.target.name]: e.target.value });
  };

  const updateTodoDataClick = () => {
    setShowUpdateInput(false);
    dispatch(updateTodo({ updateTodoData, updatedDataIndex }));
    setUpdateTodoData({
      title: "",
      description: "",
    });
  };

  return (
    <>
      {
        <div className="parent-container flex flex-column ">
          <div className="header">
            <LogoIcon />
          </div>

          <div>
            {!showUpdateInput && (
              <div className="input-section">
                <div className="inputs">
                  <input
                    value={todoData.title}
                    name="title"
                    placeholder="Title..."
                    onChange={(e) => handleInputChange(e)}
                  />
                  <textarea
                    value={todoData.description}
                    name="description"
                    placeholder="Input..."
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="add-task-btn" onClick={handleAddTodoClick}>
                  <ButtonField
                    disabled={
                      todoData.title === "" || todoData.description === ""
                    }
                    style={{
                      cursor:
                        todoData.title === "" || todoData.description === ""
                          ? "not-allowed"
                          : "pointer",
                      height: "70px",
                      width: "70px",
                    }}
                    icon={<AddIcon />}
                  />
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
                  <textarea
                    value={updateTodoData.description}
                    name="description"
                    placeholder="Input..."
                    onChange={(e) => handleUpdateTodoChange(e)}
                  />
                </div>
                <div className="add-task-btn" onClick={updateTodoDataClick}>
                  <ButtonField
                    disabled={
                      updateTodoData.title === "" ||
                      updateTodoData.description === ""
                    }
                    style={{
                      cursor:
                        updateTodoData.title === "" ||
                        updateTodoData.description === ""
                          ? "not-allowed"
                          : "pointer",
                      height: "70px",
                      width: "70px",
                      border: "2px solid #FF8303",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                    text={"UPDATE"}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="todo-list-container">
            {todoList.length > 0 ? (
              <div className="todo-section">
                <div className="todo-inner-container">
                  {todoList.map((todo, index) => (
                    <div key={index} className="todo-card">
                      <div
                        className="todo-card-data"
                        style={{ width: toolsView ? "190px" : "220px" }}
                      >
                        <span className="title-text">{todo.title}</span>
                        <span className="desc-text">{todo.description}</span>
                      </div>
                      {!toolsView && (
                        <ButtonField
                          style={{ height: "36px", width: "36px" }}
                          icon={<InfoIcon />}
                          onClick={()=>showTools(index)}
                        />
                      )}
                      {toolsView && (
                        <div
                          className="todo-edit-delete-div"
                          onClick={showTools}
                        >
                          <ButtonField
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => handleUpdateClick(todo, index)}
                            icon={<EditIcon />}
                          />
                          <ButtonField
                            style={{ height: "32px", width: "32px" }}
                            onClick={() => {
                              handleCrossClick(index);
                            }}
                            icon={<CrossIcon />}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="zeroTask">
                <div className="line"></div>
                <div>
                  <span className="noTask">No tasks</span>
                </div>
                <div className="line"></div>
              </div>
            )}
          </div>
        </div>
      }

      {modalOpen && (
        <div className="modal-wrapper">
          <div className="modal">
            <div class="modal-body">
              <h4 class="modal-title" >
                Delete this task?
              </h4>
              <div className="buttons">
              
                <ButtonField onClick={()=>handleDelete()} text={'Yes'} style={{width: '64px', height: '24px', border: '1px solid #A35709'}}/>
                <ButtonField onClick={()=>closeModal()} text={'No'} style={{width: '64px', height: '24px',border: '1px solid #A35709'}}/>
              </div>
            </div> 
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
