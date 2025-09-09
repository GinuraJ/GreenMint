import { useEffect, useState } from "react";
import "./CarbonCreditCal.css"

export default function CarbonCreditCalculation(){

    const [notProceedTrees, setTrees] = useState([]);   // store list from API
    const [loading, setLoading] = useState(true); // for loading
    const [error, setError] = useState(null);     // for errors

    const [selectedTreeId, setSelectedTreeId] = useState("");
    const [treeDetails, setTreeDetails] = useState(null);


    // Get and set not proceed trees to dropdown
    useEffect(() => {
    fetch("http://localhost:8080/api/trees/find/P")  
        .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trees");
            return res.json();
        })
        .then((data) => {
            setTrees(data); 
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

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

    return(
        <div className="CarbonMain w-full h-full">
            <h1>Generate Carbon Credit Estimate</h1>

            <label for="select" class="block text-sm/6 font-medium text-gray-900 mt-7">Tree Species</label>
            <div class="mt-2">
                <div class="flex items-center rounded-md bg-white pl-3 
                            outline outline-1 -outline-offset-1 outline-gray-300 
                            focus-within:outline-2 
                            focus-within:-outline-offset-2 
                            focus-within:outline-indigo-600">
                
                    <select id="unit" name="unit" 
                    value={selectedTreeId}
                    onChange={(e) => setSelectedTreeId(e.target.value)}
                    class="block w-full appearance-none rounded-md py-1.5 pr-8 pl-1 
                        text-base text-gray-900 placeholder:text-gray-400 
                        focus:outline-none sm:text-sm/6">

                        <option value="-">Select tree</option>
                        <option value="all">All</option>

                        {/* ✅ Loading / Error states */}
                        {loading && <option disabled>Loading...</option>}
                        {error && <option disabled>{error}</option>}

                        {/* ✅ Map trees from API */}
                        {!loading && !error && notProceedTrees.map((tree) => 
                        (<option key={tree.id} value={tree.treeId}>{tree.name}</option>)
                        )}
                    </select>

                    <svg viewBox="0 0 16 16" fill="currentColor" class="pointer-events-none -ml-7 size-5 text-gray-500 sm:size-4">
                        <path fill-rule="evenodd" clip-rule="evenodd" 
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                </div>
            </div>

            {treeDetails && (
            <table className="mt-4 w-full border border-gray-300 rounded-md text-left">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2">Name</th>
                        <td className="px-4 py-2">{treeDetails.name}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2">Tree species</th>
                        <td className="px-4 py-2">{treeDetails.species}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2">Height</th>
                        <td className="px-4 py-2">{treeDetails.height} cm</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-2">Age</th>
                        <td className="px-4 py-2">{treeDetails.age} years</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Diameter</th>
                        <td className="px-4 py-2">{treeDetails.diameter} cm</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2">Geo Location</th>
                        <td className="px-4 py-2">{treeDetails.geoLocation} cm</td>
                    </tr>
                </tbody>
            </table>
            )}

        </div>
    )
}