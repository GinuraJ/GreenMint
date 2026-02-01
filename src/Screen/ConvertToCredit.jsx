import MainLayout from "../Layout/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {API_BASE_URL} from "../config"


export default function ConvertToCredit() {

    const { treeId } = useParams(); 
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);     
    const [userId] = useState("ginura@gmail.com");

    useEffect(
        () => {
            let url = `${API_BASE_URL}/api/trees/find/id/${treeId}`;

            setLoading(true);

            fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tree");
                return res.json();
            })
            .then((data) => {
                setTree(data);
                setLoading(false);
                console.log("Fetched data:", data);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        },[treeId]
    )

    const ccCalculation = (density,height,diameter,age) =>{

        let agb = density*(diameter^2)*height;
        let biomass = agb + (agb*0.2);
        let dryWeight = biomass*0.725;
        let carbonMass = dryWeight*0.5;
        let co2 = carbonMass* 3.67;
        let totalCc = co2/1000;
        let yearlyCc = totalCc/age;

        return{
            AGB: density*(diameter^2)*height,
            BioMass : biomass,
            DryWeight : dryWeight,
            CarbonMass : carbonMass,
            CO2 : co2,
            TotalCarbonCredit : totalCc,
            YearlyCarbonCredit : yearlyCc
        }
    }

    const calculationResult = ccCalculation(0.6,10,30,2);

    if (loading) return <MainLayout>Loading...</MainLayout>;
    if (error) return <MainLayout>Error: {error}</MainLayout>;
    if (!tree) return <MainLayout>No tree data found.</MainLayout>;

    const handleAddToWallet = async () =>{
        try{

            // Set tree status to E which means 'Proceeed'
            let urlUpdateTreeStatus = `http://localhost:8080/api/trees/update/${treeId}/E`
            setLoading(true);
            const res = await fetch(urlUpdateTreeStatus, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to update tree status");
    
            // After changing status Get updated tree details again set visible
            const getUpdatedTreeRes = await fetch(`http://localhost:8080/api/trees/find/id/${treeId}`);
            const updatedTree = await getUpdatedTreeRes.json();
            setTree(updatedTree);

            // Update the user balance with new carbon credits
            let urlUpdateUserBalance = `http://localhost:8080/api/clientBalance/${userId}/2/${calculationResult.YearlyCarbonCredit}`
            const resBalance = await fetch(urlUpdateUserBalance, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!resBalance.ok) throw new Error("Failed to update user balance");


            // Insert a record added carbon credit into ledger entry
            let urlLedgerEntry = `http://localhost:8080/api/creditLedger`
            const LedgerEntryBody = {
                userId: userId,
                amount: calculationResult.YearlyCarbonCredit,
                transactionType: "D"
            };
            const resLedger = await fetch(urlLedgerEntry, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(LedgerEntryBody)
            });

            if (!resLedger.ok) throw new Error("Failed to enter ledger entry");

        }catch(err){
            console.error("Error updating tree:", err);
            setError(err.message);
        }finally{
            setLoading(false);
        }
        
    }

    return (

        <MainLayout>

            <div className="w-full h-[2px] bg-gray-200 mt-4"></div>

            <div className="bg-white rounded-[20px] border-2 border-gray-200 mt-5 overflow-hidden">
    

                <div className="flex items-center justify-between px-6 py-5 rounded-t-xl shadow-md" style={{ backgroundColor: "rgb(255, 249, 229)" }}>
                    <div>
                        <h1 className="text-2xl font-bold text-green-900">{tree.name}</h1>
                        <p className="text-sm text-green-800 mt-1">Tree ID: {treeId}</p>
                    </div>

                    <div>
                        {tree.status === "A" ? (
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                            onClick={handleAddToWallet}
                        >
                            💰 Add to Wallet
                        </button>
                        ) : tree.status === "E" ? (
                        <button 
                            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                            disabled
                        >
                            ✅ Already Added
                        </button>
                        ) : (
                        <button 
                            className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                            disabled
                        >
                            ⏳ Pending Approval
                        </button>
                        )}
                    </div>
                </div>


                {/* Content row (taller) */}
                <div className="p-5 min-h-[300px] grid grid-cols-[1fr_2fr] gap-4">

                    <div className="rounded-xl">
                        {tree.image ? (
                        <img
                            src={tree.image}
                            alt={tree.name}
                            className="w-full h-auto object-contain rounded-xl"
                        />
                        ) : (
                        <p className="text-gray-400 text-sm">No image available</p>
                        )}
                        <div className="mt-4 w-full bg-white rounded-lg shadow p-3 text-sm text-gray-700">
                            <p><strong>Entered By:</strong> {tree.enterUser}</p>
                            <p className="mt-3"><strong>Enter Date:</strong> {tree.enterDate}</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-green-700">
                                Basic Information
                            </h2>
                            <div className="w-[100%] h-[3px] bg-green-500 mt-2 rounded"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-3">
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="text-lg font-semibold">{tree.status}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Species</p>
                                <p className="text-lg font-semibold">{tree.species}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="text-lg font-semibold">{tree.age}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Diameter</p>
                                <p className="text-lg font-semibold">{tree.diameter}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Height</p>
                                <p className="text-lg font-semibold">{tree.height}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">GeoLocation</p>
                                <p className="text-lg font-semibold">{tree.geoLocation}</p>
                                </div>
                            </div>
                        </div>



                        <div className="mb-4 mt-5">
                            <h2 className="text-xl font-semibold text-green-700">
                                Carbon Metrics
                            </h2>
                            <div className="w-[100%] h-[3px] bg-green-500 mt-2 rounded"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {/* Row 1 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">AGB</p>
                                <p className="text-lg font-semibold">{calculationResult.AGB}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">BioMass</p>
                                <p className="text-lg font-semibold">{calculationResult.BioMass}</p>
                            </div>

                            {/* Row 2 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">DryWeight</p>
                                <p className="text-lg font-semibold">{calculationResult.DryWeight}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">CarbonMass</p>
                                <p className="text-lg font-semibold">{calculationResult.CarbonMass}</p>
                            </div>

                            {/* Row 3 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">CO2</p>
                                <p className="text-lg font-semibold">{calculationResult.CO2}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4">
                                <p className="text-sm text-gray-500">Total Carbon Credit</p>
                                <p className="text-lg font-semibold">{calculationResult.TotalCarbonCredit}</p>
                            </div>

                            {/* Row 4: YearlyCarbonCredit bigger card spanning full width */}
                            <div className="bg-yellow-100 rounded-lg shadow p-6 col-span-2 flex flex-col items-center justify-center">
                                <p className="text-sm text-green-700 font-medium">Yearly Carbon Credit</p>
                                <p className="text-2xl font-bold text-green-900">{calculationResult.YearlyCarbonCredit}</p>
                            </div>
                        </div>



                    </div>
                </div>


            </div>

            <div className="p-5">
            </div>

        </MainLayout>
    );
}