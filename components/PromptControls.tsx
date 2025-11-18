
import React from 'react';

interface PromptControlsProps {
    theme: string;
    setTheme: (prompt: string) => void;
    productDetails: string;
    setProductDetails: (details: string) => void;
    instructions: string;
    setInstructions: (instructions: string) => void;
    style: string;
    setStyle: (style: string) => void;
    modelOption: string;
    setModelOption: (option: string) => void;
    imageCount: number;
    setImageCount: (count: number) => void;
    aspectRatio: string;
    setAspectRatio: (ratio: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isImageSelected: boolean;
}

const STYLE_OPTIONS = [
    { value: 'Natural', label: 'Natural' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Cartoonish / Artistic', label: 'Artistic' },
    { value: 'Photoshoot', label: 'Photoshoot' },
];

const MODEL_OPTIONS = [
    { value: 'with', label: 'With Model' },
    { value: 'without', label: 'Without Model' },
];

const ASPECT_RATIO_OPTIONS = [
    { value: '1:1', label: 'Square' },
    { value: '16:9', label: 'Wide' },
    { value: '9:16', label: 'Tall' },
];

const PromptControls: React.FC<PromptControlsProps> = ({
    theme,
    setTheme,
    productDetails,
    setProductDetails,
    instructions,
    setInstructions,
    style,
    setStyle,
    modelOption,
    setModelOption,
    imageCount,
    setImageCount,
    aspectRatio,
    setAspectRatio,
    onGenerate,
    isLoading,
    isImageSelected
}) => {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <label htmlFor="theme-prompt" className="text-xl font-semibold text-gray-900 dark:text-white">2. Theme</label>
                <div className="relative">
                    <textarea
                        id="theme-prompt"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        placeholder=""
                        maxLength={120}
                        className="w-full h-16 p-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 resize-none"
                        disabled={isLoading}
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400 dark:text-gray-500">
                        {theme.length} / 120
                    </span>
                </div>
            </div>
            
            <div className="space-y-2">
                <label htmlFor="product-details" className="text-xl font-semibold text-gray-900 dark:text-white">3. Product Details</label>
                <textarea
                    id="product-details"
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    placeholder="e.g., A minimalist chair made of light oak wood with beige fabric cushions."
                    className="w-full h-28 p-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="instructions" className="text-xl font-semibold text-gray-900 dark:text-white">4. Instructions <span className="text-sm font-normal text-gray-500">(Optional)</span></label>
                 <div className="relative">
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g., top-down, dark moody lighting"
                        maxLength={100}
                        className="w-full h-20 p-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 resize-none"
                        disabled={isLoading}
                    />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-400 dark:text-gray-500">
                        {instructions.length} / 100
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xl font-semibold text-gray-900 dark:text-white">5. Select Style</label>
                 <div className="grid grid-cols-2 gap-2">
                    {STYLE_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setStyle(option.value)}
                            disabled={isLoading}
                            className={`w-full py-2 px-3 text-sm font-semibold border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 ${
                                style === option.value
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black border-transparent'
                                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xl font-semibold text-gray-900 dark:text-white">6. Include Model</label>
                 <div className="grid grid-cols-2 gap-2">
                    {MODEL_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setModelOption(option.value)}
                            disabled={isLoading}
                            className={`w-full py-2 px-3 text-sm font-semibold border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 ${
                                modelOption === option.value
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black border-transparent'
                                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Generation Options</h2>
                <div className="space-y-2">
                    <label htmlFor="image-count" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Images</label>
                    <input
                        type="number"
                        id="image-count"
                        value={imageCount}
                        onChange={(e) => setImageCount(Math.max(1, Math.min(8, parseInt(e.target.value, 10) || 1)))}
                        min="1"
                        max="8"
                        className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:opacity-50"
                        disabled={isLoading}
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Aspect Ratio</label>
                    <div className="flex space-x-2">
                        {ASPECT_RATIO_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setAspectRatio(option.value)}
                                disabled={isLoading}
                                className={`w-full py-2 px-3 text-sm font-semibold border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 ${
                                    aspectRatio === option.value
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-black border-transparent'
                                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !isImageSelected}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : (
                    '✨ Generate Images'
                )}
            </button>
             {!isImageSelected && (
                <p className="text-xs text-center text-gray-500">Please select a base image to enable generation.</p>
            )}
        </div>
    );
};

export default PromptControls;
