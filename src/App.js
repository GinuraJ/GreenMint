import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import {SignUpForm} from "./Components/SignUpForm/SignUpForm"
import { LoginForm } from "./Components/LoginForm/LoginForm";



import Home from "./Screen/HomeScreen";
import TreeRepository from "./Screen/TreeRepository";
import SaveTree from "./Screen/SaveTree";
import ConvertToCredit from "./Screen/ConvertToCredit";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/treeRepo" element={<TreeRepository />} />
      <Route path="/saveTree" element={<SaveTree/>} />
      <Route path="/convertToCredit/:treeId" element={<ConvertToCredit/>} />
    </Routes>
  );
}

export default App;
