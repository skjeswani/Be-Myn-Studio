
import React, { useState } from 'react';
import type { GeneratedImage } from '../types';

declare const JSZip: any;
declare const saveAs: any;

interface ImageCardProps {
    img: GeneratedImage;
    index: number;
    productName: string;
    aspectRatio: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ img, index, productName, aspectRatio }) => {
    const aspectClass = {
        '1:1': 'aspect-square',
        '16:9': 'aspect-video',
        '9:16': 'aspect-[9/16]',
    }[aspectRatio] || 'aspect-square';

    const handleDownloadSingle = () => {
        saveAs(`data:image/jpeg;base64,${img.imageData}`, `${productName}-generated-${index + 1}.jpg`);
    };
    
    if (!img.imageData) {
        return (
            <div className={`bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse ${aspectClass}`} />
        );
    }

    return (
        <div className={`group relative bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden ${aspectClass}`}>
            <img
                src={`data:image/jpeg;base64,${img.imageData}`}
                alt={`Generated image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <p className="flex-grow text-white text-xs text-center overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">{img.prompt}</p>
                <div className="mt-4 flex space-x-3">
                    <button
                        onClick={handleDownloadSingle}
                        className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={`Download image ${index + 1}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ImageGalleryProps {
    images: GeneratedImage[];
    isLoading: boolean;
    error: string | null;
    baseImageUrl: string | null | undefined;
    productName: string;
    aspectRatio: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error, baseImageUrl, productName, aspectRatio }) => {
    const [isZipping, setIsZipping] = useState(false);

    const handleDownloadAll = async () => {
        if (isZipping) return;
        setIsZipping(true);
        try {
            const zip = new JSZip();
            // Only zip images that have loaded
            images.forEach((img, index) => {
                if (img.imageData) {
                    zip.file(`${productName}-generated-${index + 1}.jpg`, img.imageData, { base64: true });
                }
            });
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, `gemini-${productName}-images.zip`);
        } catch (err) {
            console.error("Failed to create zip file:", err);
        } finally {
            setIsZipping(false);
        }
    };

    if (error) {
        return (
            <div className="h-64 flex flex-col items-center justify-center text-center p-8 space-y-2">
                <h3 className="text-xl font-bold text-red-500">Generation Failed</h3>
                <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    if (images.length > 0) {
        // Only show download all button if at least one image has been generated
        const hasGeneratedImages = images.some(img => !!img.imageData);
        return (
             <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Results</h3>
                    {hasGeneratedImages && (
                        <button
                            onClick={handleDownloadAll}
                            disabled={isZipping}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {isZipping ? 'Zipping...' : 'Download All'}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {images.map((img, index) => (
                       <ImageCard 
                          key={index} 
                          img={img} 
                          index={index} 
                          productName={productName}
                          aspectRatio={aspectRatio}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[40vh] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 space-y-4">
            {baseImageUrl && (
                <img src={baseImageUrl} alt="Selected base" className="max-w-xs max-h-40 rounded-lg" />
            )}
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300">Your gallery is waiting</h3>
            <p className="max-w-md text-gray-500">
                Select a base image, describe your theme, and click "Generate Images" to see the magic happen.
            </p>
        </div>
    );
};

export default ImageGallery;
