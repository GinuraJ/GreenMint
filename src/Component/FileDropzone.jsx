
import { Upload } from "lucide-react";
import React, { RefObject } from "react";

export function FileDropzone({
    fileInputRef,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    handleFileSelect,
}) {
return (
    <div className="">
        <div
        className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
        <div className="mb-2 bg-green-100 rounded-full p-3">
            <Upload className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
            Upload the tree image
        </p>
        <p className="text-sm text-muted-foreground mt-1">
            or,{" "}
            <label
            htmlFor="fileUpload"
            className="text-primary hover:text-primary/90 font-medium cursor-pointer"
            onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
            >
            click to browse
            </label>{" "}
            (4MB max)
        </p>
        <input
            type="file"
            id="fileUpload"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
        />
        </div>
    </div>
);
}
