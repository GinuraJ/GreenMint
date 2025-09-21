import { useEffect, useState } from "react";
import "./CarbonCreditCal.css"


export default function CarbonCreditCalculation(){

    const [trees, setTrees] = useState([]);   // store list from API
    const [loading, setLoading] = useState(true); // for loading
    const [error, setError] = useState(null);     // for errors

    const [selectedTreeId, setSelectedTreeId] = useState("");
    const [treeDetails, setTreeDetails] = useState(null);

    const [treeType, setTreeType] = useState("ALL");


    useEffect(() => {
        if (!selectedTreeId) {
            setTreeDetails(null);
            return;
        }
        console.log(selectedTreeId);

        fetch(`http://localhost:8080/api/trees/find/id/${selectedTreeId}`)
            .then((res) => res.json())
            .then((data) => setTreeDetails(data))
            .catch((err) => console.error(err));

            console.log(treeDetails);
    }, [selectedTreeId]);

    useEffect(() =>{
        let url = "";

        if (treeType === "ALL") {
            url = "http://localhost:8080/api/trees";
        } else {
            url = `http://localhost:8080/api/trees/find/${treeType}`;
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
    }, [treeType]);


    return(
        <div className="CarbonMain w-full h-full">
            <h1>Generate Carbon Credit Estimate</h1>

            <label for="select" class="block text-sm/6 font-medium text-gray-900 mt-7">Tree Type</label>

            <button 
            type="button"
            onClick={() => setTreeType("ALL")} 
            class="rounded-md bg-red-400 px-4 py-2 
                    text-white text-sm font-medium shadow-sm 
                    outline outline-1 outline-gray-300 -outline-offset-1
                    hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">All
            </button>

            <button 
            type="button"
            onClick={() => setTreeType("P")} 
            class="rounded-md bg-green-600 px-4 py-2 
                    text-white text-sm font-medium shadow-sm 
                    outline outline-1 outline-gray-300 -outline-offset-1
                    hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
            Pending
            </button>

            <button 
            type="button"
            onClick={() => setTreeType("D")} 
            class="rounded-md bg-blue-600 px-4 py-2 
                    text-white text-sm font-medium shadow-sm 
                    outline outline-1 outline-gray-300 -outline-offset-1
                    hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
            Proced
            </button>

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
                                    onClick={() => console.log("Clicked tree:", tree)}
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
    )
}