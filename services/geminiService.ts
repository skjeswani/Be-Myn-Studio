
import { GoogleGenAI, Modality } from "@google/genai";
import { generateCreativePrompts } from './promptGenerationService';
import type { GeneratedImage, BaseImage } from '../types';

// Utility to convert file to base64 and return its object URL
export const fileToImageObject = (file: File): Promise<BaseImage> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const url = URL.createObjectURL(file);
        reader.readAsDataURL(file);
        reader.onload = () => resolve({
            base64: (reader.result as string).split(',')[1],
            url: url,
            mimeType: file.type,
        });
        reader.onerror = error => reject(error);
    });
};

// Utility to fetch an image URL and convert it to base64
export const urlToBase64 = async (url: string): Promise<{ base64: string, mimeType: string }> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({ base64, mimeType: blob.type });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const identifyProductFromImage = async (
    base64Image: string,
    mimeType: string
): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = "Identify the main product in this image. Provide a short, concise name for it (e.g., 'vintage camera', 'red sneakers').";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error identifying product:", error);
        return "Uploaded Product"; // Fallback on error
    }
};


const _generateSingleImage = async (
    referenceImages: { base64: string, mimeType: string }[],
    prompt: string
): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const imageParts = referenceImages.map(image => ({
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType,
            },
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    ...imageParts,
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }

        throw new Error("No image was generated in the response. The model may have refused the request.");

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. The prompt may have been blocked. Check the console for more details.");
    }
};

export const generateImageBatch = async (
    referenceImages: BaseImage[],
    theme: string,
    style: string,
    modelOption: string,
    imageCount: number,
    productName: string,
    productDetails: string,
    instructions: string,
    onInitialPrompts: (prompts: string[]) => void,
    onImageGenerated: (image: GeneratedImage, index: number) => void
): Promise<void> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Please set it in your environment.");
    }

    // Step 1: Generate creative prompts
    const creativePrompts = await generateCreativePrompts(
        theme,
        style,
        modelOption,
        imageCount,
        productName,
        productDetails,
        instructions
    );
    
    onInitialPrompts(creativePrompts);

    // Step 2: Generate an image for each creative prompt, calling back as each one completes
    const generationPromises = creativePrompts.map((prompt, index) => 
        _generateSingleImage(referenceImages, prompt).then(imageData => {
            onImageGenerated({ prompt, imageData }, index);
        })
    );

    // Wait for all promises to resolve to complete the process
    await Promise.all(generationPromises);
};
