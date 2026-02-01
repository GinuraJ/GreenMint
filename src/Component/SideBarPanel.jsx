import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home, TreePine,Trees,Wallet,Shuffle} from "lucide-react";

export default function SideBar({ setHeaderData }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("");

    const headerMap = {
    home: {
        icon: Home,
        title: "Home",
        subtitle: "Welcome to your dashboard",
    },
    saveTree: {
        icon: TreePine,
        title: "Upload Tree Image",
        subtitle: "Add a tree to your carbon credit portfolio",
    },
    treeRepo: {
        icon: Trees,
        title: "Tree Repository",
        subtitle: "View all saved trees",
    },
    wallet: {
        icon: Wallet,
        title: "My Wallet",
        subtitle: "Check your carbon credits and balance",
    },
    orders: {
        icon: Shuffle,
        title: "Orders",
        subtitle: "View your past transactions",
    },
    };

    useEffect(() => {
    const pathKey = Object.keys(headerMap).find((key) =>
        location.pathname.includes(key)
    ) || "home";

    setActive(pathKey);
    setHeaderData(headerMap[pathKey]);
    }, [location.pathname]);

    const handleClick = (key) => {
    navigate(`/${key}`);
    };

    return (
    <div className="m-4">
        {Object.keys(headerMap).map((key) => (
        <button
            key={key}
            className={`mb-3 w-full text-left px-4 py-2 rounded-xl transition 
            ${active === key ? "bg-[rgb(34,139,34)] text-white" : "bg-white hover:bg-green-100"}`}
            onClick={() => handleClick(key)}
        >
            {key === "home" && "🏠 Home"}
            {key === "saveTree" && "🪴 Save Tree"}
            {key === "treeRepo" && "🌳 Tree Repository"}
            {key === "wallet" && "💳 View My Wallet"}
            {key === "orders" && "📊 Orders"}
            
        </button>
        ))}
    </div>
    );
}
