// Global
import React from 'react';

// Components
import TodoList from './components/Todo/TodoList/TodoList';

// Styles
import './App.less';

function App() {
  return (
    <div className="App">
      <div className="todos">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
