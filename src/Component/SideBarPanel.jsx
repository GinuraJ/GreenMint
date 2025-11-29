import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("");

    useEffect(() => {
        if (location.pathname.includes("/home")) setActive("home");
        else if (location.pathname.includes("/saveTree")) setActive("saveTree");
        else if (location.pathname.includes("/treeRepo")) setActive("treeRepo");
        else if (location.pathname.includes("/wallet")) setActive("wallet");
        else if (location.pathname.includes("/orders")) setActive("orders");
    }, [location.pathname]);

    return (
        <div className="m-4">

            <button
                className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
                    ${active === "home" ? "bg-green-300" : "bg-white hover:bg-green-100"}`}
                onClick={() => {
                    setActive("home");
                    navigate("/home");
                }}>
                🏠 Home
            </button>

            <button
                className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
                    ${active === "saveTree" ? "bg-green-300" : "bg-white hover:bg-green-100"}`}
                onClick={() => {
                    setActive("saveTree");
                    navigate("/saveTree");
                }}>
                🪴 Save Tree
            </button>

            <button
                className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
                    ${active === "treeRepo" ? "bg-green-300" : "bg-white hover:bg-green-100"}`}
                onClick={() => {
                    setActive("treeRepo");
                    navigate("/treeRepo");
                }}>
                🌳 Tree Repository
            </button>

            <button
                className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
                    ${active === "wallet" ? "bg-green-300" : "bg-white hover:bg-green-100"}`}
                onClick={() => {
                    setActive("wallet");
                    navigate("/wallet");
                }}>
                💳 View My Wallet
            </button>

            <button
                className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
                    ${active === "orders" ? "bg-green-300" : "bg-white hover:bg-green-100"}`}
                onClick={() => {
                    setActive("orders");
                    navigate("/orders");
                }}>
                📊 Orders
            </button>
        </div>
    );
}
