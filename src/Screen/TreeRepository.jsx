import MainLayout from "../Layout/MainLayout"
import TabButton from "../Component/TabButton"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
            url = "http://localhost:8080/api/trees";
        } else if (activeTreeType === "Pending"){
            url = "http://localhost:8080/api/trees/find/P";
        } else if(activeTreeType === "Proceed"){
            url = "http://localhost:8080/api/trees/find/E";
        } else{
            url = "http://localhost:8080/api/trees/find/A";
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

    return(
        <MainLayout>

            <h1>Tree Repo</h1>
            
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, a magnam dicta voluptates velit minus nesciunt. Consequatur beatae corrupti incidunt numquam, recusandae doloremque illo odit vel consequuntur, minus explicabo magnam.</p>

            <div className="flex">
            {tabs.map((tab) => (
                <TabButton
                key={tab}
                label={tab}
                active={activeTreeType === tab}
                onClick={() => setActiveTab(tab)}
                />
            ))}
            </div>

            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Age</th>
                        <th className="px-4 py-2 border">Diameter</th>
                        <th className="px-4 py-2 border">GeoLocation</th>
                        <th className="px-4 py-2 border">Species</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {trees.length > 0 ? (
                        trees.map((tree) =>(
                            <tr key={tree.treeId}>
                                <td className="px-4 py-2 border">{tree.name}</td>
                                <td className="px-4 py-2 border">{tree.status}</td>
                                <td className="px-4 py-2 border">{tree.age}</td>
                                <td className="px-4 py-2 border">{tree.diameter}</td>
                                <td className="px-4 py-2 border">{tree.height}</td>
                                <td className="px-4 py-2 border">{tree.geoLocation}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button
                                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-800"
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

        </MainLayout>
    )
}