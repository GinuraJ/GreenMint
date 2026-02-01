import MainLayout from "../Layout/MainLayout";
import { useState } from "react";

import {CircleCheck,ArrowLeftRight  } from "lucide-react";
import CardHeader from "../Component/CardHeader";
import {API_BASE_URL} from "../config"


export default function Orders() {
    const [buySellFlag, setBuySellFlag] = useState("B");
    const [expType, setExpType] = useState("N");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [executeStatus,setExecuteStatus] = useState("M");
    const [expDateFrom,setExpDateFrom] = useState("");
    const [expDateTo,setExpDateTo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        let from = expDateFrom;
        let to = expDateTo;
    
        if (expType === "T") {
            from = now.toISOString().slice(0,16);
            to = new Date(now.getTime() + 24*60*60*1000).toISOString().slice(0,16);
        } else if (expType === "N") {
            from = now.toISOString().slice(0,16);
            to = new Date(now.setFullYear(now.getFullYear() + 1)).toISOString().slice(0,16);
        } else{
            from = expDateFrom;
            to = expDateTo;
        }

        try{
            const formData = new FormData();
            formData.append("buySell", buySellFlag);
            formData.append("price", price);
            formData.append("quantity",quantity );
            formData.append("executeFrom",from );
            formData.append("executeTo", to);
            formData.append("balanceQuantity", quantity);
            formData.append("executeStatus",executeStatus );
            formData.append("userId", "test@gmail.com");


            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            const response = await fetch(`${API_BASE_URL}/api/order`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ "+ data.message);
                console.log("Place order:", data);

                // Set feilds empty
                setBuySellFlag("B"); 
                setExpType("N"); 
                setPrice("");
                setQuantity(""); 
                setExecuteStatus("M"); 
                setExpDateFrom("");
                setExpDateTo(""); 

            } else {
                alert("❌ " + data.message);
            }

        }catch (error) {
            console.error("Error placing order:", error);
            alert("Error"+ error);
        }
    }

    const handleReset = () => {
        setBuySellFlag("B");
        setExpType("N");
        setPrice("");
        setQuantity("");
        setExecuteStatus("M");
        setExpDateFrom("");
        setExpDateTo("");
    };
    

    return (
        <MainLayout>

            <div className="w-full h-[2px] bg-gray-200 mt-4"></div>

            <form onSubmit={handleSubmit}>

                <div className="treeRepoLeft bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200 mt-5">

                    <div className="mb-5">
                                <CardHeader 
                                icon={ArrowLeftRight} 
                                title="Place Buy / Sell orders" 
                                iconColor="green" 
                                iconBgColor="bg-green-100" />
                                </div>

                    <div className="mb-4">

                        <div className="grid grid-cols-2">

                            <button
                            type="button"
                            onClick={() => setBuySellFlag("B")}
                            className={`px-4 py-2 rounded-t-lg border-b-2 transition bg-gray-100 ${
                                buySellFlag === "B"
                                ? "border-green-500 bg-green-100 text-green-700"
                                : "border-transparent hover:bg-gray-200"
                            }`}
                            >Buy Order
                            </button>

                            <button
                            type="button"
                            onClick={() => setBuySellFlag("S")}
                            className={`px-4 py-2 rounded-t-lg border-b-2 transition transition bg-gray-100 ${
                                buySellFlag === "S"
                                ? "border-green-500 bg-green-100 text-green-700"
                                : "border-transparent hover:bg-gray-200"
                            }`}
                            >Sell Order
                            </button>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            {/* Price */}
                            <label for="price" class="block text-sm/6 font-medium text-gray-900">Price</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">

                                    <input id="price" type="text" name="price" placeholder="LKR 00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                </div>
                            </div>

                            {/* Execute Period whethere it is withing today, given period or its never expired */}
                            <label for="height" class="block text-sm/6 font-medium text-gray-900 mt-7">Expire Period</label>  
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                            outline outline-1 -outline-offset-1 outline-gray-300 
                                            focus-within:outline-2 
                                            focus-within:-outline-offset-2 
                                            focus-within:outline-indigo-600">
                                
                                    <select id="unit" name="unit" 
                                    class="block w-full appearance-none rounded-md py-1.5 pr-8 pl-1 
                                        text-base text-gray-900 placeholder:text-gray-400 
                                        focus:outline-none sm:text-sm/6" 
                                        value={expType}
                                        onChange={(e) => setExpType(e.target.value)}>
                                        <option value="N">Never Expire</option>
                                        <option value="T">Today</option>
                                        <option value="R">Period</option>
                                    </select>

                                    <svg viewBox="0 0 16 16" fill="currentColor" class="pointer-events-none -ml-7 size-5 text-gray-500 sm:size-4">
                                        <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Date Range only visible is user select "Period" in Expire Period dropdown */}
                            {expType === "R" && (
                                    <div className="datePeriodSelector grid grid-cols-2 gap-2">
                                    <div>
                                        <label for="fromDate" class="block text-sm/6 font-medium text-gray-900 mt-7">From</label>
                                        <div class="mt-2">
                                            <div
                                                class="flex items-center rounded-md bg-white pl-3 
                                                outline outline-1 
                                                -outline-offset-1 
                                                outline-gray-300 
                                                has-[input:focus]:outline-2 
                                                has-[input:focus]:-outline-offset-2 
                                                has-[input:focus]:outline-indigo-600"
                                            >
                                                <input
                                                id="fromDate"
                                                type="datetime-local"
                                                name="datetime"
                                                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 
                                                    placeholder:text-gray-400 
                                                    focus:outline-none sm:text-sm/6"
                                                value={expDateFrom}
                                                onChange={(e) => setExpDateFrom(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
        
                                    <div>
                                        <label for="toDate" class="block text-sm/6 font-medium text-gray-900 mt-7">To</label>
                                        <div class="mt-2">
                                            <div
                                                class="flex items-center rounded-md bg-white pl-3 
                                                outline outline-1 
                                                -outline-offset-1 
                                                outline-gray-300 
                                                has-[input:focus]:outline-2 
                                                has-[input:focus]:-outline-offset-2 
                                                has-[input:focus]:outline-indigo-600"
                                            >
                                                <input
                                                id="toDate"
                                                type="datetime-local"
                                                name="datetime"
                                                class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 
                                                    placeholder:text-gray-400 
                                                    focus:outline-none sm:text-sm/6"
                                                value={expDateTo}
                                                onChange={(e) => setExpDateTo(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                        <div>
                            {/* Quantity Field */}
                            <label for="quantity" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">

                                    <input id="price" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            {/* Execute Status WHich is multiple or Single */}
                            <label for="select" class="block text-sm/6 font-medium text-gray-900 mt-7">Execute Status</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                            outline outline-1 -outline-offset-1 outline-gray-300 
                                            focus-within:outline-2 
                                            focus-within:-outline-offset-2 
                                            focus-within:outline-indigo-600">
                                
                                    <select id="unit" name="unit" 
                                    class="block w-full appearance-none rounded-md py-1.5 pr-8 pl-1 
                                        text-base text-gray-900 placeholder:text-gray-400 
                                        focus:outline-none sm:text-sm/6" value={executeStatus} onChange={(e) => setExecuteStatus(e.target.value)} >
                                        {/* <option value="">Select specie</option> */}
                                        <option value="M">Multiple</option>
                                        <option value="S">Single</option>
                                    </select>

                                    <svg viewBox="0 0 16 16" fill="currentColor" class="pointer-events-none -ml-7 size-5 text-gray-500 sm:size-4">
                                        <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                </div>
                            </div>
{/* 
                            <label for="select" class="block text-sm/6 font-medium text-gray-900 mt-7">Place the order</label>

                            <button type="submit"
                            class="w-full rounded-md bg-indigo-600 px-4 py-2 
                                    text-white text-sm font-medium shadow-sm 
                                    outline outline-1 outline-gray-300 -outline-offset-1
                                    hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 mt-2">
                            Submit
                            </button> */}
                            
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-3 mt-5">

                    {/* Blank area*/}
                    <div className=""></div>

                    {/* Button area */}
                    <div className="col-span-2 bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex justify-end">
                                <button
                                type="button"
                                    onClick={handleReset}
                                    className="w-[95%] p-2 bg-[rgb(224,255,224)] text-black rounded-[20px] shadow hover:bg-[rgb(200,240,200)] transition-colors border-1 border-gray-200"
                                >
                                    Reset Form
                                </button>
                            </div>

                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    className="w-[95%] p-2 bg-[rgb(34,139,34)] rounded-[20px] text-white shadow hover:bg-[rgb(0,100,0)] transition-colors flex items-center justify-center gap-2"
                                >
                                    <CircleCheck className="w-5 h-5" />
                                    <span>Place order</span>
                                </button>
                            </div>
                        </div>

                        <div className="btnDescription flex justify-center items-center mt-5">
                            <p className="text-center text-sm text-gray-500">
                                Please complete required fields: Photo, Name and Species
                            </p>
                        </div>
                    </div>

                </div>

            </form>
            
        </MainLayout>
    );
}