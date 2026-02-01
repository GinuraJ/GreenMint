import MainLayout from "../Layout/MainLayout"
import TabButton from "../Component/TabButton"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter,Leaf,Ruler,CircleCheck,ArrowLeftRight,TrendingUp, TrendingDown  } from "lucide-react";
import CardHeader from "../Component/CardHeader";

import {API_BASE_URL} from "../config"

export default function TreeRepository(){

    const navigate = useNavigate();
    const [trees, setTrees] = useState([]);   // store list from API
    const [loading, setLoading] = useState(true); // for loading
    const [error, setError] = useState(null);     // for errors
    const [activeTreeType, setActiveTab] = useState("All");
    const tabs = ["All", "Pending", "Approved","Proceed"];

    useEffect(() =>{
        let url = "";

        if (activeTreeType === "All") {
            url = `${API_BASE_URL}/api/trees`;
        } else if (activeTreeType === "Pending"){
            url = `${API_BASE_URL}/api/trees/find/P`;
        } else if(activeTreeType === "Proceed"){
            url = `${API_BASE_URL}/api/trees/find/E`;
        } else{
            url = `${API_BASE_URL}/api/trees/find/A`;
        }

        setLoading(true);

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch trees");
                return res.json();
            })
            .then((data) => {
                setTrees(data);
                setLoading(false);
                console.log("Fetched data:", data);
                console.log("trees : ", trees);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [activeTreeType]);

    const STATUS_CONFIG = {
        E: {
            label: "Proceed",
            className: "bg-red-100 text-red-800"
        },
        P: {
            label: "Pending",
            className: "bg-yellow-100 text-yellow-800"
        },
        A: {
            label: "Approved",
            className: "bg-green-100 text-green-800"
        }
    };
    
    return(
        <MainLayout>

            <div className="w-full h-[2px] bg-gray-200 mt-4"></div>
            
            <p className="mt-3 mb-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, a magnam dicta voluptates velit minus nesciunt. Consequatur beatae corrupti incidunt numquam, recusandae doloremque illo odit vel consequuntur, minus explicabo magnam.</p>

            <div className="treeRepoList p-2 bg-[rgb(255,255,255)] rounded-[20px] border-2  border-gray-200 mt-5">
                <div className="flex items-center">
                <div 
                            className="">
                            <CardHeader 
                            icon={Filter} 
                            title="" 
                            iconColor="blue" 
                            iconBgColor="bg-blue-100" />
                        </div>
                {tabs.map((tab) => (
                    <TabButton
                    key={tab}
                    label={tab}
                    active={activeTreeType === tab}
                    onClick={() => setActiveTab(tab)}
                    />
                ))}
                </div>
            </div>

            
            
            <div className="treeRepoList bg-[rgb(255,255,255)] rounded-[20px] border-2  border-gray-200 mt-5">

                <table className="min-w-full">
                    <thead className="bg-green-200 text-left">
                        <tr>
                            <th className="px-4 py-4 rounded-tl-[20px]">Name</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Age</th>
                            <th className="px-4 py-4">Diameter</th>
                            <th className="px-4 py-4">Height</th>
                            <th className="px-4 py-4">GeoLocation</th>
                            <th className="px-4 py-4 rounded-tr-[20px]">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trees.length > 0 ? (
                            trees.map((tree) =>(
                                <tr key={tree.treeId}>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">{tree.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                                STATUS_CONFIG[tree.status]?.className || "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {STATUS_CONFIG[tree.status]?.label || tree.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">{tree.age} years</td>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">{tree.diameter}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">{tree.height}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">{tree.geoLocation}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 last:border-b-0">
                                        <button
                                        className="bg-[rgb(34,139,34)] rounded-[20px] p-2 hover:bg-[rgb(0,100,0)] transition-colors text-white shadow w-[90%]"
                                        onClick={() => navigate(`/convertToCredit/${tree.treeId}`)}
                                        >
                                        View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td className="px-4 py-2 border text-center" colSpan={5}>
                                    {loading ? "Loading..." : "No trees found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </MainLayout>
    )
}