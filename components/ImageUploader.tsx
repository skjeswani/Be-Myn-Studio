
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
    const [selectedSampleNames, setSelectedSampleNames] = useState<string[]>([]);
    const [isIdentifying, setIsIdentifying] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const isUploaded = selectedReferenceUrls.length === 1 && selectedReferenceUrls[0]?.startsWith('blob:');

    // Effect: If an upload occurs (blob URL present), clear the catalog selection visually.
    useEffect(() => {
        if (isUploaded) {
            setSelectedSampleNames([]);
        }
    }, [isUploaded]);

    const handleProductToggle = useCallback(async (product: Product) => {
        // 1. Calculate new selection state
        let newSelection: string[];
        if (selectedSampleNames.includes(product.name)) {
            newSelection = selectedSampleNames.filter(name => name !== product.name);
        } else {
            newSelection = [...selectedSampleNames, product.name];
        }
        
        setSelectedSampleNames(newSelection);
        
        // 2. If user deselected everything
        if (newSelection.length === 0) {
            onProductSelect([]);
            setProductName('');
            setProductDetails('');
            return;
        }

        // 3. Fetch and Aggregate Data for all selected products
        setIsProductLoading(true);
        try {
            const selectedProducts = PRODUCT_CATALOG.filter(p => newSelection.includes(p.name));
            
            // Combine Names
            const combinedName = selectedProducts.map(p => p.name).join(' + ');
            setProductName(combinedName);
            
            // Combine Details
            const combinedDetails = selectedProducts.map(p => `${p.name.toUpperCase()}:\n${p.details}`).join('\n\n');
            setProductDetails(combinedDetails);

            // Fetch ALL images from ALL selected products
            const allUrls = selectedProducts.flatMap(p => p.imageUrls);
            const imagePromises = allUrls.map(async (url) => {
                const { base64, mimeType } = await urlToBase64(url);
                return { base64, mimeType, url };
            });
            
            const images = await Promise.all(imagePromises);
            onProductSelect(images);

        } catch (error) {
            console.error("Failed to load product images:", error);
            // On error, reset to safe state
            onProductSelect([]);
            setProductName('');
            setProductDetails('');
        } finally {
            setIsProductLoading(false);
        }
    }, [onProductSelect, setProductName, setProductDetails, selectedSampleNames]);
    
    // Initial Load: Automatically select the first product if nothing is selected
    useEffect(() => {
        if (selectedReferenceUrls.length === 0 && PRODUCT_CATALOG.length > 0 && selectedSampleNames.length === 0) {
            handleProductToggle(PRODUCT_CATALOG[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedSampleNames([]); // Clear grid selection
            setProductDetails(''); 
            setIsIdentifying(true);
            
            try {
                const imageObject = await fileToImageObject(file);
                onProductSelect([imageObject]); 
                setProductName("Identifying..."); 

                const identifiedName = await identifyProductFromImage(imageObject.base64, imageObject.mimeType);
                setProductName(identifiedName); 
            } catch (error) {
                console.error("Failed to process file:", error);
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
        <div className="space-y-6 relative">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. SELECT PRODUCT</h2>
                <p className="text-sm text-gray-500 mt-1">Tap multiple items to combine them.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
                {PRODUCT_CATALOG.map((product) => {
                    const isSelected = selectedSampleNames.includes(product.name);
                    return (
                        <button
                            key={product.name}
                            onClick={() => handleProductToggle(product)}
                            disabled={isLoading || isProductLoading}
                            className={`group relative flex flex-col transition-all duration-200 focus:outline-none ${
                                isLoading || isProductLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        >
                            <div className={`relative w-full aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                                isSelected
                                    ? 'border-black dark:border-white'
                                    : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-700'
                            }`}>
                                <img 
                                    src={product.imageUrls[0]} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                />
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black rounded-full p-1 shadow-sm z-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <span className={`mt-2 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
                                isSelected ? 'text-black dark:text-white font-bold' : 'text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-300'
                            }`}>
                                {product.name}
                            </span>
                        </button>
                    );
                })}
                
                {/* Upload Button integrated into Grid */}
                <button
                    onClick={handleUploadClick}
                    disabled={isLoading || isProductLoading}
                    className={`group relative flex flex-col items-center justify-start transition-all duration-200 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    <div className={`w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 flex flex-col items-center justify-center transition-colors bg-gray-50 dark:bg-gray-900/50 ${isUploaded ? 'border-black dark:border-white' : ''}`}>
                         {isUploaded && selectedReferenceUrls.length > 0 ? (
                             <img src={selectedReferenceUrls[0]} alt="Uploaded" className="w-full h-full object-cover rounded-lg opacity-75" />
                         ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                         )}
                         {isUploaded && (
                            <div className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black rounded-full p-1 shadow-sm z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                         )}
                    </div>
                    <span className={`mt-2 text-xs uppercase tracking-wider font-medium text-center transition-colors ${isUploaded ? 'text-black dark:text-white font-bold' : 'text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-300'}`}>
                        {isUploaded ? 'Custom' : 'Upload'}
                    </span>
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                disabled={isLoading}
            />
            
            {/* Loading Overlay */}
            {isProductLoading && (
                 <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-[1px] rounded-lg">
                    <div className="flex flex-col items-center">
                         <svg className="animate-spin h-6 w-6 text-black dark:text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            )}

            {isUploaded && selectedReferenceUrls.length > 0 && (
                 <div className="mt-4 space-y-2 animate-fade-in">
                    <label htmlFor="product-name" className="block text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                        Custom Product Name
                    </label>
                     <div className="relative">
                        <input
                            id="product-name"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            disabled={isLoading || isIdentifying}
                            className="w-full p-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600 disabled:opacity-50 text-gray-900 dark:text-white text-sm"
                        />
                        {isIdentifying && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
