import MainLayout from "../Layout/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ConvertToCredit() {

    const { treeId } = useParams(); 
    const [tree, setTree] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);     
    const [userId] = useState("ginura@gmail.com");

    useEffect(
        () => {
            let url = `http://localhost:8080/api/trees/find/id/${treeId}`;

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

            <h1>Convert to credit</h1>
            <p>Tree ID: {treeId}</p>

            <div className="grid grid-cols-2">
                <div>
                    <div className="space-y-2">
                        <p><strong>Status:</strong> {tree.name}</p>
                        <p><strong>Status:</strong> {tree.status}</p>
                        <p><strong>Species:</strong> {tree.species}</p>
                        <p><strong>Age:</strong> {tree.age}</p>
                        <p><strong>Diameter:</strong> {tree.diameter}</p>
                        <p><strong>Height:</strong> {tree.height}</p>
                        <p><strong>GeoLocation:</strong> {tree.geoLocation}</p>
                        <p><strong>Entered By:</strong> {tree.enterUser}</p>
                        <p><strong>Enter Date:</strong> {tree.enterDate}</p>
                    </div>

                    {/* Handle image */}
                    {tree.image && (
                        <img
                        src={tree.image}
                        alt={tree.name}
                        // className="w-full max-w-md h-auto rounded mb-4"
                        className="w-64 h-64 object-contain rounded"
                        />
                    )}
                </div>

                <div>
                    <div className="space-y-2">
                        <p><strong>AGB:</strong> {calculationResult.AGB}</p>
                        <p><strong>BioMass:</strong> {calculationResult.BioMass}</p>
                        <p><strong>DryWeight:</strong> {calculationResult.DryWeight}</p>
                        <p><strong>CarbonMass:</strong> {calculationResult.CarbonMass}</p>
                        <p><strong>CO2:</strong> {calculationResult.CO2}</p>
                        <p><strong>TotalCarbonCredit:</strong> {calculationResult.TotalCarbonCredit}</p>
                        <p><strong>YearlyCarbonCredit:</strong> {calculationResult.YearlyCarbonCredit}</p>
                    </div>

                    {tree.status === "A" ? (
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                        onClick={handleAddToWallet}>
                            💰 Add to wallet
                        </button>
                    ) : tree.status === "E" ? (
                        <p className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg shadow-inner cursor-not-allowed inline-block">
                            ✅ Already added
                        </p>
                    ) : (
                        <p className="bg-yellow-100 text-yellow-700 font-semibold py-2 px-4 rounded-lg shadow-sm inline-block">
                            ⏳ Pending Approval
                        </p>
                    )}

                </div>
            </div>

        </MainLayout>
    );
}