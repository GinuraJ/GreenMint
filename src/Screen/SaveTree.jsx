import MainLayout from "../Layout/MainLayout"
import { useState } from "react";
import { FileDropzone } from "../Component/FileDropzone";
import CardHeader from "../Component/CardHeader";
import { useRef } from "react";
import { Camera,Leaf,Ruler,CircleCheck,RulerDimensionLine } from "lucide-react";


export default function SaveTree(){

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [diameter, setDiameter] = useState("");
    const [height, setHeight] = useState("");
    const [geoLocation, setGeoLocation] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [treeActualHeight, setTreeActualHeight] = useState("");
    const [isHeightLocked, setIsHeightLocked] = useState(false);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    function getTreeActualHeight(treePixelHeight, humanPixelHeight, humanActualHeightCm) {
        const treeActualHeightCm = (treePixelHeight / humanPixelHeight) * humanActualHeightCm;
        return treeActualHeightCm; // centimeters
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("species", species);
            formData.append("age", age);
            formData.append("diameter", diameter);
            formData.append("height", height);
            formData.append("geoLocation", geoLocation);
            formData.append("status", "P");
            formData.append("enterUser", "admin"); 

            if (imageFile) {
                formData.append("image", imageFile);
                console.log("Has file");
            }else{
                console.log("Not file");
            }

            console.log("Sending form data:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await fetch("http://localhost:8080/api/trees/addTree", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ "+ data.message);
                console.log("Saved tree:", data);

                // Set feilds empty
                setName(""); 
                setSpecies(""); 
                setAge("");
                setDiameter(""); 
                setHeight(""); 
                setGeoLocation("");
                setImageFile(null); 
                setImagePreview(null);

            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error("Error saving tree:", error);
            alert("Error"+ error);
        }
    };

    const handleProceed = async () => {
        if (!imageFile) {
            alert("Please select an image first");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
    
            console.log("Sending image to YOLO API...");
    
            const response = await fetch("http://64.227.128.213:8000/detect", {
                method: "POST",
                body: formData
            });
    
            console.log("Response:", response);

            const data = await response.json();
            console.log("YOLO API response:", data);
    
            if (response.ok) {
                alert("Detection success:\n" + JSON.stringify(data, null, 2));

                // Store data in local variables
                const treePixelHeights = data.tree_pixel_heights || [];
                const humanPixelHeights = data.human_pixel_heights || [];
                const treeCount = data.tree_count || 0;
                const humanCount = data.human_count || 0;
                const treeBottomPixels = data.tree_bottom_pixels || [];
                const humanBottomPixels = data.human_bottom_pixels || [];

                // Example: log them
                console.log("Tree pixel heights:", treePixelHeights);
                console.log("Human pixel heights:", humanPixelHeights);
                console.log("Tree count:", treeCount);
                console.log("Human count:", humanCount);
                console.log("Tree bottom pixels:", treeBottomPixels);
                console.log("Human bottom pixels:", humanBottomPixels);

                if(treeCount == 1){
                    if(humanCount == 1){

                        const treeActualHeight = getTreeActualHeight(
                            treePixelHeights[0],
                            humanPixelHeights[0],
                            150
                        );
                        
                        setTreeActualHeight(treeActualHeight);
                        
                        setHeight(treeActualHeight.toFixed(2));
                        
                        setIsHeightLocked(true);


                        
                    }else if(humanCount > 1){
                        alert("More than one reference object are recognized by model");
                    }else{
                        alert("No reference object found");
                    }
                }else if(treeCount > 1){
                    alert("More than one trees are recognized by model. Please use a different angle");
                }else{
                    alert("No tree found. Please upload a tree along with you");
                }
    
            } else {
                alert("Detection failed: " + data.message);
            }
    
        } catch (error) {
            console.error("Error calling YOLO API:", error);
            alert("API Error: " + error);
        }
    };


    const fileInputRef = useRef(null);

    const handleBoxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
        }
    };
    
    const handleFileSelect = (files) => {
        if (files && files.length > 0) {
            setImageFile(files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
        }
    };
    

    return(
        <MainLayout>

            <div className="w-full h-[2px] bg-gray-200 mt-4"></div>

            {/* Main Form  oldclass : treeRepoLeft*/}
            <form className="mainForm mt-5" onSubmit={handleSubmit}>

                <div className="grid grid-cols-3 gap-5">

                    {/* Image upload area */}
                    <div className="row-span-2 bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200">
                        <div className="mb-5">
                            <CardHeader 
                            icon={Camera} 
                            title="Upload Image" 
                            iconColor="green" 
                            iconBgColor="green-100" />
                            </div>

                        <FileDropzone
                            fileInputRef={fileInputRef}
                            handleBoxClick={handleBoxClick}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            handleFileSelect={handleFileSelect}
                        />

                        {imagePreview && (
                            <div className="mt-4 flex items-center bg-white rounded-lg shadow p-2 w-full h-32">
                            <img
                                src={imagePreview}
                                alt={imageFile?.name || "Preview"}
                                className="h-full w-32 object-cover rounded-md border"
                            />
                            <div className="ml-4 flex-1 overflow-hidden">
                                <p className="text-gray-700 font-medium truncate">
                                {imageFile?.name}
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                {imageFile?.type} • {(imageFile?.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            </div>
                        )}


                        <button
                            type="button"
                            onClick={handleProceed}
                            className="mt-3 w-[50%] p-1 bg-[rgb(34,139,34)] rounded-[20px] text-white shadow hover:bg-[rgb(0,100,0)] transition-colors flex items-center justify-center"
                        >
                            <RulerDimensionLine className="w-5 h-5 mr-3" />
                            <span>Find</span>
                        </button>

                    </div>
                    {/* Basic imaformation area */}
                    <div className="col-span-2 bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200">
                        <div 
                            className="mb-5">
                            <CardHeader 
                            icon={Leaf} 
                            title="Basic Information" 
                            iconColor="green" 
                            iconBgColor="green-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            {/* Tree name */}
                            <div className="nameMain">
                                <label for="price" class="block text-sm/6 font-medium text-gray-900">Name</label>
                                <div class="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 
                                        outline outline-1 
                                        -outline-offset-1 
                                        outline-gray-300 
                                        has-[input:focus]:outline-2 
                                        has-[input:focus]:-outline-offset-2 
                                        has-[input:focus]:outline-indigo-600">

                                        <input id="price" type="text" name="price" placeholder="Mango" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {/* Tree species */}
                            <div className="speciesMain">

                                <label for="select" class="block text-sm/6 font-medium text-gray-900">Tree Species</label>
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
                                            value={species} onChange={(e) => setSpecies(e.target.value)}>
                                            <option value="">Select specie</option>
                                            <option value="1">Mango</option>
                                            <option value="2">Jack</option>
                                            <option value="3">feet</option>
                                            <option value="4">meter</option>
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

                    {/* Physical measurements area */}
                    <div className="col-span-2 bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200">
                        
                        <div 
                            className="mb-5">
                            <CardHeader 
                            icon={Ruler} 
                            title="Physical Measurements" 
                            iconColor="blue" 
                            iconBgColor="blue-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="diametrMain">
                                <label for="diameter" class="block text-sm/6 font-medium text-gray-900">Diameter / Width</label>
                                <div class="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 
                                        outline outline-1 
                                        -outline-offset-1 
                                        outline-gray-300 
                                        has-[input:focus]:outline-2 
                                        has-[input:focus]:-outline-offset-2 
                                        has-[input:focus]:outline-indigo-600">

                                        <input id="diameter" type="text" name="diameter" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        value={diameter} onChange={(e) => setDiameter(e.target.value)} />
                                        <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                                            <select id="currency" name="currency" aria-label="Currency" class="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                <option>cm</option>
                                                <option>inch</option>
                                                <option>feet</option>
                                                <option>meter</option>
                                            </select>
                                            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="heightMain">
                                <label for="height" class="block text-sm/6 font-medium text-gray-900">Height</label>      
                                <div className="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 
                                        outline outline-1 
                                        -outline-offset-1 
                                        outline-gray-300 
                                        has-[input:focus]:outline-2 
                                        has-[input:focus]:-outline-offset-2 
                                        has-[input:focus]:outline-indigo-600">
                                    <div>
                                        
                                    </div>
                                        <input id="height" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        disabled={isHeightLocked}
                                        value={height} 
                                        onChange={(e) => setHeight(e.target.value)
                                            
                                        } />
                                        <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                                            <select id="currency" name="currency" aria-label="Currency" class="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                <option>cm</option>
                                                <option>inch</option>
                                                <option>feet</option>
                                                <option>meter</option>
                                            </select>
                                            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                                <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="agaMain">
                                <label for="age" class="block text-sm/6 font-medium text-gray-900 mt-7">Age</label>
                                <div class="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 
                                        outline outline-1 
                                        -outline-offset-1 
                                        outline-gray-300 
                                        has-[input:focus]:outline-2 
                                        has-[input:focus]:-outline-offset-2 
                                        has-[input:focus]:outline-indigo-600">

                                        <input id="age" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        value={age} onChange={(e) => setAge(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="geoMain">
                                <label for="geo" class="block text-sm/6 font-medium text-gray-900 mt-7">Geo Location</label>
                                <div class="mt-2">
                                    <div class="flex items-center rounded-md bg-white pl-3 
                                        outline outline-1 
                                        -outline-offset-1 
                                        outline-gray-300 
                                        has-[input:focus]:outline-2 
                                        has-[input:focus]:-outline-offset-2 
                                        has-[input:focus]:outline-indigo-600">
                                        <input id="geo" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        value={geoLocation} onChange={(e) => setGeoLocation(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Blank area*/}
                    <div className=""></div>

                    {/* Button area */}
                    <div className="col-span-2 bg-[rgb(255,255,255)] rounded-[20px] p-5 border-2  border-gray-200">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex justify-end">
                                <button
                                    
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
                                    <span>Save Tree Data</span>
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
    )
}