import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import ProfileCreation from './components/ProfileCreation.jsx';
import HomePage from './components/HomePage.jsx';
import TodoList from './components/TodoList.jsx';
import { TaskProvider } from './components/TaskContext.jsx';



const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<ProfileCreation />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
