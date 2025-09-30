import { useState } from "react";

export default function Model({ closeModal }){
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return(

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg relative">
            <button 
                onClick={closeModal} 
                className="absolute top-4 right-6 text-gray-500 hover:text-gray-800">
            ✕
            </button>

            <div className="inputArea grid grid-cols-2">

                <div className="mt-2">
                    <label htmlFor="file-upload" 
                            className="flex items-center justify-between rounded-md bg-white pl-3 pr-3 py-2
                                        outline outline-1 -outline-offset-1 outline-gray-300
                                        focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600
                                        cursor-pointer">
                        <span className="text-base text-gray-900 sm:text-sm/6">Upload image</span>
                        <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        />
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" clipRule="evenodd" 
                                d="M3 16.5A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-1 0v6.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V10a.5.5 0 0 0-1 0v6.5zM10 3a.5.5 0 0 1 .5.5v8.793l2.146-2.147a.5.5 0 1 1 .708.708l-3 3a.498.498 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L9.5 12.293V3.5A.5.5 0 0 1 10 3z" />
                        </svg>
                    </label>

                    {imagePreview && (
                        <div className="uploadedImgPreview mt-2 border rounded-md overflow-hidden w-full h-full">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        </div>
                    )}
                </div>

                <div className="mt-2">
                    <button 
                    onClick={closeModal} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Proceed
                    </button>
                </div>

            </div>

        </div>
    </div>


    )
}