import React, { useState, useContext } from "react";
import ImportOrderTitleBox from "../../Components/MarketComponents/MarketTitleBox/ImportOrderTitleBox/ImportOrderTitleBox";
import { UserContext } from '../../Context/User/UserContext'; 
import { OrderContext } from '../../Context/Order/OrderContext'; 


const ImportOrdersPage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { uploadOrderInvoices } = useContext(OrderContext);

    const { user } = useContext(UserContext);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (fileIndex) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, index) => index !== fileIndex);

            // Update the input element's file list to reflect the changes
            const fileInput = document.querySelector("input[type='file']");
            if (fileInput) {
                const dataTransfer = new DataTransfer();
                updatedFiles.forEach((file) => dataTransfer.items.add(file));
                fileInput.files = dataTransfer.files;
            }

            return updatedFiles;
        });
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select at least one file before uploading.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Files have been successfully uploaded.");
                setSelectedFiles([]);

                // Clear the input element
                const fileInput = document.querySelector("input[type='file']");
                if (fileInput) {
                    fileInput.value = "";
                }
            } else {
                alert("Failed to upload the files.");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("An error occurred while uploading the files.");
        }
    };

    return (
        <div className="">
            <ImportOrderTitleBox></ImportOrderTitleBox>
            <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 items-center mb-4">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="border p-2 rounded-md"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Upload
                </button>
            </div>
            <ul className="w-1/2">
                {selectedFiles.map((file, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center text-gray-500 mb-2 border-b pb-1"
                    >
                        {file.name}
                        <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default ImportOrdersPage;
