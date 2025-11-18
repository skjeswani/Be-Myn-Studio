
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
    }, [referenceImages, themePrompt, imageCount, style, modelOption, productName, productDetails, instructions]);

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans antialiased">
            <Header 
                toggleTheme={toggleTheme} 
                theme={theme}
            />
            <main className="flex-grow container mx-auto p-4 md:p-8 w-full">
                <div className="max-w-xl mx-auto space-y-10">
                    <ImageUploader 
                        onProductSelect={handleProductSelection} 
                        setProductName={setProductName}
                        productName={productName}
                        isLoading={isLoading}
                        selectedReferenceUrls={referenceImages.map(img => img.url)}
                        setProductDetails={setProductDetails}
                    />
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
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                        isImageSelected={referenceImages.length > 0}
                    />
                </div>

                <div className="mt-16">
                    <ImageGallery
                        images={generatedImages}
                        isLoading={isLoading}
                        error={error}
                        baseImageUrl={referenceImages[0]?.url}
                        productName={productName}
                        aspectRatio={aspectRatio}
                    />
                </div>
            </main>
            <footer className="text-center p-6 text-gray-500 text-xs">
                <p>Powered by Gemini 2.5 Flash Image. For personal use.</p>
            </footer>
        </div>
    );
};

export default App;
