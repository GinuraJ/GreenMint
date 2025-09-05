import "./TreeRepository.css"
import { useState } from "react";

export default function TreeRepo(){

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImagePreview(URL.createObjectURL(file));
        }
    };

    return(
        
        <div className="TreeRepoMain w-full h-full">
            <div className="headingTexts">
                <h1>Tree Repository</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eos dolor, obcaecati doloremque facilis exercitationem, neque reiciendis rem enim in esse perspiciatis illo accusamus odit quod sapiente recusandae! Necessitatibus, doloribus!</p>
            </div>

            <div className="contentArea">

                <div className="inputArea grid grid-cols-2">
                    <div className="inputsArea">
                        <div className="inputs">

                            <label for="price" class="block text-sm/6 font-medium text-gray-900">Name</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">
                                {/* <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                                    <input id="price" type="text" name="price" placeholder="Mango" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>

                            <label for="select" class="block text-sm/6 font-medium text-gray-900 mt-7">Tree Species</label>
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

                            <label for="price" class="block text-sm/6 font-medium text-gray-900 mt-7">Age</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">
                                {/* <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                                    <input id="price" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>

                            <label for="price" class="block text-sm/6 font-medium text-gray-900 mt-7">Diameter / Width</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">
                                {/* <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                                    <input id="price" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
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

                            <label for="price" class="block text-sm/6 font-medium text-gray-900 mt-7">Geo Location</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 
                                    outline outline-1 
                                    -outline-offset-1 
                                    outline-gray-300 
                                    has-[input:focus]:outline-2 
                                    has-[input:focus]:-outline-offset-2 
                                    has-[input:focus]:outline-indigo-600">
                                    <input id="price" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="heightEstimateArea">
                        <label for="price" class="block text-sm/6 font-medium text-gray-900">Height</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white pl-3 
                                outline outline-1 
                                -outline-offset-1 
                                outline-gray-300 
                                has-[input:focus]:outline-2 
                                has-[input:focus]:-outline-offset-2 
                                has-[input:focus]:outline-indigo-600">
                            {/* <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                                <input id="price" type="text" name="price" placeholder="00" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
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

                        <p className="pt-2">Note: If you dont know or not sure aboubt the tree height, please upload a picture of the tree and make sure you stand under the tree. If you want to get the tree height from the system press the button.</p>

                        <div class="mt-2">
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" />

                                <div class="w-11 h-6 bg-gray-300 rounded-full 
                                            outline outline-1 outline-gray-300 -outline-offset-1
                                            peer-focus:outline-2 peer-focus:-outline-offset-2 peer-focus:outline-indigo-600
                                            peer-checked:bg-indigo-600 transition-colors duration-200">
                                </div>

                                <div class="absolute ml-1 mt-1 w-4 h-4 bg-white rounded-full shadow 
                                            transition-transform duration-200 peer-checked:translate-x-5">
                                </div>

                                <span class="ml-3 text-sm text-gray-700">Disable</span>
                            </label>
                        </div>

                        {/* <div class="mt-2">
                            <label for="file-upload" 
                                class="flex items-center justify-between rounded-md bg-white pl-3 pr-3 py-2
                                        outline outline-1 -outline-offset-1 outline-gray-300
                                        focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600
                                        cursor-pointer">

                                <span class="text-base text-gray-900 sm:text-sm/6">Upload image</span>

                                <input id="file-upload" type="file" accept="image/*" class="hidden" />

                                
                                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" clip-rule="evenodd" 
                                    d="M3 16.5A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-1 0v6.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V10a.5.5 0 0 0-1 0v6.5zM10 3a.5.5 0 0 1 .5.5v8.793l2.146-2.147a.5.5 0 1 1 .708.708l-3 3a.498.498 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L9.5 12.293V3.5A.5.5 0 0 1 10 3z" />
                                </svg>
                            </label>
                        </div> */}
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
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setImagePreview(URL.createObjectURL(file));
                                }}
                                />
                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" clipRule="evenodd" 
                                        d="M3 16.5A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-1 0v6.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V10a.5.5 0 0 0-1 0v6.5zM10 3a.5.5 0 0 1 .5.5v8.793l2.146-2.147a.5.5 0 1 1 .708.708l-3 3a.498.498 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L9.5 12.293V3.5A.5.5 0 0 1 10 3z" />
                                </svg>
                            </label>

                            {/* Small preview area */}
                            {imagePreview && (
                                <div className="uploadedImgPreview mt-2 border rounded-md overflow-hidden">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit"
                    class="w-full rounded-md bg-indigo-600 px-4 py-2 
                            text-white text-sm font-medium shadow-sm 
                            outline outline-1 outline-gray-300 -outline-offset-1
                            hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                    Submit
                    </button>
                </div>
            </div>
        </div>
            
        
    )
}