
import React, { useState, useCallback, useEffect } from 'react';
import { generateImageBatch } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptControls from './components/PromptControls';
import ImageGallery from './components/ImageGallery';
import type { GeneratedImage, BaseImage } from './types';

const App: React.FC = () => {
    const [referenceImages, setReferenceImages] = useState<BaseImage[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [themePrompt, setThemePrompt] = useState<string>('');
    const [productDetails, setProductDetails] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [style, setStyle] = useState<string>('Natural');
    const [modelOption, setModelOption] = useState<string>('without');
    const [imageCount, setImageCount] = useState<number>(4);
    const [aspectRatio, setAspectRatio] = useState<string>('1:1');
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [indianContext, setIndianContext] = useState<boolean>(false);
    const [onAppMode, setOnAppMode] = useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleProductSelection = (images: BaseImage[] | null) => {
        setReferenceImages(images || []);
    };

    const handleGenerate = useCallback(async () => {
        if (referenceImages.length === 0) {
            setError("Please select a product or upload an image first.");
            return;
        }
        if (!themePrompt.trim()) {
            setError("Please enter a theme.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]); // Clear previous results

        try {
            await generateImageBatch(
                referenceImages,
                themePrompt,
                style,
                modelOption,
                imageCount,
                productName,
                productDetails,
                instructions,
                indianContext,
                onAppMode,
                aspectRatio,
                (prompts) => { // onInitialPrompts
                    const placeholderImages = prompts.map(prompt => ({
                        prompt: prompt,
                        imageData: '', // Use empty string to signify "loading"
                    }));
                    setGeneratedImages(placeholderImages);
                },
                (image, index) => { // onImageGenerated
                    setGeneratedImages(prevImages => {
                        // Create a new array to ensure React re-renders
                        const newImages = [...prevImages];
                        newImages[index] = image;
                        return newImages;
                    });
                }
            );
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred. Please try again.');
            setGeneratedImages([]); // Clear placeholders on error
        } finally {
            setIsLoading(false);
        }
    }, [referenceImages, themePrompt, imageCount, style, modelOption, productName, productDetails, instructions, indianContext, onAppMode, aspectRatio]);

    return (
        <div 
            className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 font-sans antialiased transition-colors duration-300"
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#000000' }}
        >
            <Header 
                toggleTheme={toggleTheme} 
                theme={theme}
            />
            <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-65px)]">
                {/* Left Panel: Controls */}
                <div className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 overflow-y-auto h-auto lg:h-full">
                    <div className="space-y-10">
                        <ImageUploader 
                            onProductSelect={handleProductSelection} 
                            setProductName={setProductName}
                            productName={productName}
                            isLoading={isLoading}
                            selectedReferenceUrls={referenceImages.map(img => img.url)}
                            setProductDetails={setProductDetails}
                        />
                        <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-6"></div>
                        <PromptControls
                            theme={themePrompt}
                            setTheme={setThemePrompt}
                            productDetails={productDetails}
                            setProductDetails={setProductDetails}
                            instructions={instructions}
                            setInstructions={setInstructions}
                            style={style}
                            setStyle={setStyle}
                            modelOption={modelOption}
                            setModelOption={setModelOption}
                            imageCount={imageCount}
                            setImageCount={setImageCount}
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                            indianContext={indianContext}
                            setIndianContext={setIndianContext}
                            onAppMode={onAppMode}
                            setOnAppMode={setOnAppMode}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                            isImageSelected={referenceImages.length > 0}
                        />
                    </div>
                </div>

                {/* Right Panel: Gallery/Stage */}
                <div className="lg:col-span-8 xl:col-span-9 bg-gray-50 dark:bg-gray-950 p-6 md:p-12 flex flex-col items-center justify-center overflow-y-auto h-auto lg:h-full">
                    <div className="w-full max-w-4xl">
                         <ImageGallery
                            images={generatedImages}
                            isLoading={isLoading}
                            error={error}
                            baseImageUrl={referenceImages[0]?.url}
                            productName={productName}
                            aspectRatio={aspectRatio}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
