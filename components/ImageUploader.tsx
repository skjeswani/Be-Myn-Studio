
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PRODUCT_CATALOG } from '../constants';
import { urlToBase64, fileToImageObject, identifyProductFromImage } from '../services/geminiService';
import type { Product, BaseImage } from '../types';

interface ImageUploaderProps {
    onProductSelect: (images: BaseImage[] | null) => void;
    setProductName: (name: string) => void;
    setProductDetails: (details: string) => void;
    productName: string;
    isLoading: boolean;
    selectedReferenceUrls: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onProductSelect, setProductName, setProductDetails, productName, isLoading, selectedReferenceUrls }) => {
    const [selectedSampleName, setSelectedSampleName] = useState<string | null>(null);
    const [isIdentifying, setIsIdentifying] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const isUploaded = selectedReferenceUrls.length === 1 && selectedReferenceUrls[0]?.startsWith('blob:');

    const handleProductChange = useCallback(async (product: Product) => {
        setSelectedSampleName(product.name);
        setProductName(product.name);
        setProductDetails(product.details);
        setIsProductLoading(true);
        try {
            const imagePromises = product.imageUrls.map(async (url) => {
                const { base64, mimeType } = await urlToBase64(url);
                return { base64, mimeType, url };
            });
            const images = await Promise.all(imagePromises);
            onProductSelect(images);
        } catch (error) {
            console.error("Failed to load product images:", error);
            onProductSelect(null);
            setProductName('');
            setProductDetails('');
        } finally {
            setIsProductLoading(false);
        }
    }, [onProductSelect, setProductName, setProductDetails]);
    
     useEffect(() => {
        // Automatically select the first product on initial load
        if (selectedReferenceUrls.length === 0 && PRODUCT_CATALOG.length > 0) {
            handleProductChange(PRODUCT_CATALOG[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedSampleName(null); // Clear sample selection
            setProductDetails(''); // Clear details on upload
            setIsIdentifying(true);
            
            try {
                const imageObject = await fileToImageObject(file);

                // Set the image for preview immediately
                onProductSelect([imageObject]); 
                setProductName("Identifying..."); // Set temporary name

                // Identify the product from the image
                const identifiedName = await identifyProductFromImage(imageObject.base64, imageObject.mimeType);
                setProductName(identifiedName); // Set the final, identified name

            } catch (error) {
                console.error("Failed to process file:", error);
                // On error, select the image but give it a default name the user can change
                if (file) {
                    try {
                        const imageObject = await fileToImageObject(file);
                        onProductSelect([imageObject]);
                    } catch (e) {
                        onProductSelect(null);
                    }
                }
                setProductName("My Product");
            } finally {
                setIsIdentifying(false);
            }
        }
    };
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Select Product</h2>
                <p className="text-sm text-gray-500">Choose a sample from your catalog or upload your own.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                {PRODUCT_CATALOG.map((product) => (
                    <button
                        key={product.name}
                        onClick={() => handleProductChange(product)}
                        disabled={isLoading || isProductLoading}
                        className={`relative p-2 border-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black ${
                            selectedSampleName === product.name && !isUploaded
                                ? 'border-blue-500' 
                                : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                        } ${(isLoading || isProductLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isProductLoading && selectedSampleName === product.name && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-md">
                                <svg className="animate-spin h-6 w-6 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                        <img src={product.imageUrls[0]} alt={product.name} className="w-full h-32 object-contain rounded-md" />
                        <span className="block text-xs mt-2 font-medium truncate">{product.name}</span>
                    </button>
                ))}
            </div>

            <p className="text-center text-sm text-gray-500">or</p>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                disabled={isLoading}
            />
            
            {isUploaded && selectedReferenceUrls.length > 0 ? (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/50 dark:border-gray-800">
                    <img src={selectedReferenceUrls[0]} alt="Uploaded preview" className="w-full max-h-48 object-contain rounded-lg mx-auto" />
                    <div className="space-y-2">
                        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Name
                        </label>
                         <div className="relative">
                            <input
                                id="product-name"
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                disabled={isLoading || isIdentifying}
                                className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
                            />
                            {isIdentifying && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={handleUploadClick} 
                        disabled={isLoading} 
                        className="w-full text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50"
                    >
                        Change Image
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleUploadClick}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-500 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload an Image
                </button>
            )}
        </div>
    );
};

export default ImageUploader;