// Global
import React from 'react';

// Components
import TodoItem from '../TodoItem/TodoItem';
import Form from '../../UI/Form/Form';
import {
  deleteItemsAPI,
  getApiItems,
  postAPI,
  API_URL,
  updateItemsApi,
} from '../../api';
import { postFormData } from '../../postFormData';

// Styles
import './TodoList.less';

function TodoList() {
  const urlApi = `${API_URL}/todos`;
  const currentDateMillisecond = new Date().getTime();
  const [status, setStatus] = React.useState(null);
  const [statusUpdate, setStatusUpdate] = React.useState(false);
  const [todos, setTodos] = React.useState();
  const [fileUpload, setFileUpload] = React.useState(null);
  const [isPosting, setIsPosting] = React.useState({
    title: 'Post!',
    status: false,
  });
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    endDate: '',
    filePath: '',
    fileName: '',
  });

  async function handleSubmit(formData) {
    const { name, description, endDate } = formData;
    const dataIsFine = name && description && endDate;

    if (dataIsFine) {
      setIsPosting(() => ({ status: true, title: 'Loading...' }));

      if (fileUpload) {
        const fileInfo = await postFormData(fileUpload);

        if (fileInfo) {
          formData.filePath = fileInfo.filePath;
          formData.fileName = fileInfo.fileName;

          postAPI(formData, 'todos.json').then(() => {
            getApiItems(API_URL, '/todos.json').then((res) => setTodos(res));
          });
        }
      } else {
        postAPI(formData, 'todos.json').then(() => {
          getApiItems(API_URL, '/todos.json').then((res) => setTodos(res));
        });
      }
      setIsPosting(() => ({ status: false, title: 'Post!' }));
      clearForm();
    }
  }

  function clearForm() {
    setStatus(false);
    setFileUpload(null);
    return setFormData({
      name: '',
      description: '',
      endDate: '',
      filePath: '',
      fileName: '',
    });
  }

  React.useEffect(() => {
    getApiItems(API_URL, '/todos.json').then((res) => setTodos(res));
    if (statusUpdate) {
      getApiItems(API_URL, '/todos.json').then((res) => setTodos(res));
      setStatusUpdate(false);
    }
  }, [statusUpdate]);

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h1 className="todo-list__header__title">Todo List!</h1>
      </div>
      <button
        className="create-todo"
        onClick={() => {
          setStatus(!status);
        }}
      >
        Create todo!
      </button>
      {status && (
        <Form title="Create Todo!">
          <p className="input-title">Your Name:</p>
          <input
            type="text"
            required
            className="name-input"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <p className="input-title">Your Description:</p>
          <input
            required
            type="text"
            className="description-input"
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <p className="input-title">Your End Date:</p>
          <input
            type="datetime-local"
            className="date-input"
            required
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                endDate: e.target.value,
              }))
            }
          />
          <p className="input-title">Your File:</p>
          <input
            type="file"
            className="name-input"
            onChange={(event) => setFileUpload(event.target.files[0])}
          />
          <button
            className="todo-list__create-button"
            disabled={isPosting && isPosting.status}
            onClick={() => {
              handleSubmit(formData);
            }}
          >
            {isPosting && isPosting.title}
          </button>
        </Form>
      )}
      <div className="line"></div>
      {todos && todos.length ? (
        todos.map((todo, i) => {
          return (
            <TodoItem
              name={todo.name}
              description={todo.description}
              date={todo.endDate}
              file={{
                name: todo.fileName,
                url: todo.filePath,
              }}
              onChangeTodo={(item) => {
                updateItemsApi(todo.id, urlApi, item).then(() => {
                  getApiItems(API_URL, '/todos.json').then((res) =>
                    setTodos(res)
                  );
                });
              }}
              currentDateMillisecond={currentDateMillisecond}
              onDelete={() =>
                deleteItemsAPI(todo.id, urlApi).then(() => {
                  setStatusUpdate(true);
                })
              }
              key={i}
            />
          );
        })
      ) : (
        <span className="no-todos">The list is empty</span>
      )}
    </div>
  );
}

export default TodoList;
