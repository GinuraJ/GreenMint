import MainLayout from "../Layout/MainLayout";
import { useState } from "react";

export default function Orders() {
    const [activeTab, setActiveTab] = useState("B");

    return (
        <MainLayout>

            <h1>Orders</h1>

            <div className="treeRepoLeft">

                <div className="mb-4 grid grid-cols-2">
                    <div className="border border-gray-300 grid grid-cols-2">

                        <button
                        onClick={() => setActiveTab("B")}
                        className={`px-4 py-2 rounded-t-lg border-b-2 transition ${
                            activeTab === "B"
                            ? "border-green-500 bg-green-100 text-green-700"
                            : "border-transparent hover:bg-gray-100"
                        }`}
                        >Buy Order
                        </button>

                        <button
                        onClick={() => setActiveTab("S")}
                        className={`px-4 py-2 rounded-t-lg border-b-2 transition ${
                            activeTab === "S"
                            ? "border-red-500 bg-red-100 text-red-700"
                            : "border-transparent hover:bg-gray-100"
                        }`}
                        >Sell Order
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="inputs">
                        <label for="price" class="block text-sm/6 font-medium text-gray-900">Price</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 
                                outline outline-1 
                                -outline-offset-1 
                                outline-gray-300 
                                has-[input:focus]:outline-2 
                                has-[input:focus]:-outline-offset-2 
                                has-[input:focus]:outline-indigo-600">

                                <input id="price" type="text" name="price" placeholder="Mango" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                            </div>
                        </div>

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
                                    focus:outline-none sm:text-sm/6">
                                    {/* <option value="">Select specie</option> */}
                                    <option value="1">Multiple</option>
                                    <option value="2">Single</option>
                                </select>

                                <svg viewBox="0 0 16 16" fill="currentColor" class="pointer-events-none -ml-7 size-5 text-gray-500 sm:size-4">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="heightEstimateArea">
                        <label for="price" class="block text-sm/6 font-medium text-gray-900">Quantity</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 
                                outline outline-1 
                                -outline-offset-1 
                                outline-gray-300 
                                has-[input:focus]:outline-2 
                                has-[input:focus]:-outline-offset-2 
                                has-[input:focus]:outline-indigo-600">

                                <input id="price" type="text" name="price" placeholder="Mango" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                            </div>
                        </div>
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
                                        focus:outline-none sm:text-sm/6">
                                        <option value="">Never Expire</option>
                                        <option value="1">Today</option>
                                        <option value="2">Period</option>
                                    </select>

                                    <svg viewBox="0 0 16 16" fill="currentColor" class="pointer-events-none -ml-7 size-5 text-gray-500 sm:size-4">
                                        <path fill-rule="evenodd" clip-rule="evenodd" 
                                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" />
                                    </svg>
                                </div>
                        </div>
                    </div>
                </div>

            </div>
            
        </MainLayout>
    );
}