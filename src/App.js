import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import {SignUpForm} from "./Components/SignUpForm/SignUpForm"
import { LoginForm } from "./Components/LoginForm/LoginForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
