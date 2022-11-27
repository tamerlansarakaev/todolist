// Global
import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Styles
import './TodoItem.less';
import Form from '../../UI/Form/Form';

function TodoItem({
  name,
  description,
  date,
  currentDateMillisecond,
  file,
  ...props
}) {
  const dateFormat = dayjs(date).format('DD/MM/YY HH:mm:ss');
  const [statusChangeTodo, setStatusChangeTodo] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name,
    description,
    endDate: date,
    filePath: file.url,
    fileName: file.name,
  });
  const [statusDate, setStatusDate] = React.useState('В процессе');

  function statusDateTodo() {
    const currentDate = new Date(currentDateMillisecond).getTime();
    const endDate = new Date(date).getTime();
    const result = Math.round(endDate - currentDate);
    if (result < 0) {
      setStatusDate('Завершено');
      return;
    }
    setTimeout(() => {
      setStatusDate('Завершено');
    }, result);
    if (result > 0) {
      setStatusDate('В процессе!');
    }
  }

  React.useEffect(() => {
    if (currentDateMillisecond) {
      statusDateTodo();
    }
  }, [date]);

  function setToDefaultDate() {
    const todoData = {
      name,
      description,
      endDate: date,
      filePath: file.url,
      fileName: file.name,
    };
    if (!statusChangeTodo && formData !== todoData) {
      return setFormData({
        name,
        description,
        endDate: date,
        filePath: file.url,
        fileName: file.name,
      });
    }
  }

  return (
    <div className="todo-item">
      <div className="todo-info">
        <p className="todo-info__name">Name: {name}</p>
        <p className="todo-info__decription">Decription: {description}</p>
        <p className="todo-info__status">Status: {date && statusDate}</p>
        {file.url && (
          <span className="todo-info__file">
            Your file:
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </span>
        )}
      </div>
      <div className="todo-other-info">
        <button className="todo-delete" onClick={() => props.onDelete()}>
          Delete
        </button>
        <div className="todo-change">
          <button
            className="todo-change-button"
            onClick={() => {
              setToDefaultDate();
              setStatusChangeTodo(!statusChangeTodo);
            }}
          >
            Change Todo
          </button>
          {statusChangeTodo && (
            <Form
              title="Change Current Todo!"
              className="todo-other-info__form"
            >
              <label>New name:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
              <label>New description:</label>
              <input
                type="text"
                value={formData.description}
                required
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
              <label>New end date:</label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    endDate: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  props.onChangeTodo(formData);
                  setStatusChangeTodo(!statusChangeTodo);
                }}
              >
                Change Todo
              </button>
            </Form>
          )}
        </div>
        {dateFormat && <p className="todo-item-date">End Date: {dateFormat}</p>}
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  currentDateMillisecond: PropTypes.number,
  file: PropTypes.object,
};
export default TodoItem;
