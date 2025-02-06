import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';
import AdminUsersPage from './components/Admin/AdminUsersPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin-users" element={<AdminUsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
