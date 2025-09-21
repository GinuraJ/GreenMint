import { useState } from "react";

export default function PopUp({ closeModal }) {
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg relative">
            <button 
                onClick={closeModal} 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
            ✕
            </button>
            {/* <h2 className="text-xl font-bold mb-4">Tree Details</h2>
            <p>Put any content here, like tree information.</p>
            <button 
                onClick={closeModal} 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Close
            </button> */}
        </div>
    </div>
)
}
