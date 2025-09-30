import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import {SignUpForm} from "./Components/SignUpForm/SignUpForm"
import { LoginForm } from "./Components/LoginForm/LoginForm";



import Home from "./Screen/HomeScreen";
import TreeRepository from "./Screen/TreeRepository";
import SaveTree from "./Screen/SaveTree";
import ConvertToCredit from "./Screen/ConvertToCredit";
import Wallet from "./Screen/Wallet";
import Orders from "./Screen/Orders";





function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/treeRepo" element={<TreeRepository />} />
      <Route path="/saveTree" element={<SaveTree/>} />
      <Route path="/wallet" element={<Wallet/>} />
      <Route path="/convertToCredit/:treeId" element={<ConvertToCredit/>} />
      <Route path="/orders" element={<Orders/>} />

    </Routes>
  );
}

export default App;
