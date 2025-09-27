import { useNavigate } from "react-router-dom";


export default function SideBar(){

    const navigate = useNavigate();

    return (
        <div>
            <h2>Side Bar</h2>

            <button 
                className="mb-3 w-full text-left px-4 py-2 bg-white rounded hover:bg-green-100 transition"
                onClick={() => navigate("/home")}>
                🏠 Home
            </button>

            <button 
                className="mb-3 w-full text-left px-4 py-2 bg-white rounded hover:bg-green-100 transition"
                onClick={() => navigate("/saveTree")}>
                🪴 Save Tree
            </button>

            <button 
                className="mb-3 w-full text-left px-4 py-2 bg-white rounded hover:bg-green-100 transition"
                onClick={() => navigate("/treeRepo")}>
                🌳 Tree Repository
            </button>

        </div>
    )
}