
import { GoogleGenAI } from "@google/genai";
import { generateCreativePrompts } from './promptGenerationService';
import type { GeneratedImage, BaseImage } from '../types';

// Utility to convert file to base64 and return its object URL
export const fileToImageObject = (file: File): Promise<BaseImage> => {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // extract base64 part
            const base64 = result.split(',')[1];
            const mimeType = file.type;
            resolve({ base64, mimeType, url });
        };
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

// Utility to convert a remote URL to base64
export const urlToBase64 = async (url: string): Promise<{ base64: string, mimeType: string }> => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const blob = await response.blob();
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve({ base64, mimeType: blob.type });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error converting URL to base64:", error);
        throw error;
    }
};

export const identifyProductFromImage = async (base64: string, mimeType: string): Promise<string> => {
    if (!process.env.API_KEY) throw new Error("API_KEY not set");
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64 } },
                    { text: "Identify this product. Return only the generic product name (e.g., 'Lipstick', 'Running Shoe'). Do not include brand names or extra adjectives." }
                ]
            }
        });
        return response.text?.trim() || "Product";
    } catch (e) {
        console.error("Identification failed", e);
        return "Product";
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
    indianContext: boolean,
    aspectRatio: string,
    onInitialPrompts: (prompts: string[]) => void,
    onImageGenerated: (image: GeneratedImage, index: number) => void
) => {
    // 1. Generate Prompts
    const prompts = await generateCreativePrompts(
        theme, style, modelOption, imageCount, productName, productDetails, instructions, indianContext, aspectRatio
    );
    
    onInitialPrompts(prompts);

    // 2. Generate Images one by one (streaming effect)
    const generatePromises = prompts.map(async (prompt, index) => {
        try {
            const generatedImage = await _generateSingleImage(referenceImages, prompt, aspectRatio);
            onImageGenerated(generatedImage, index);
        } catch (error: any) {
            console.error(`Failed to generate image ${index + 1}:`, error);
            // We still return a placeholder with error indication if needed, or just let the UI handle the missing image state
             onImageGenerated({ prompt: prompt, imageData: '' }, index);
        }
    });

    await Promise.allSettled(generatePromises);
};

const _generateSingleImage = async (
    referenceImages: BaseImage[],
    prompt: string,
    aspectRatio: string
): Promise<GeneratedImage> => {
    if (!process.env.API_KEY) throw new Error("API_KEY not set");

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Prepare contents: Text Prompt + All Reference Images
    const parts: any[] = [
        { text: prompt }
    ];

    referenceImages.forEach(img => {
        parts.push({
            inlineData: {
                mimeType: img.mimeType,
                data: img.base64
            }
        });
    });

    const config: any = {
         imageConfig: {
             aspectRatio: aspectRatio,
         }
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: config
        });

        // Extract Image
        let base64Image = '';
        if (response.candidates && response.candidates.length > 0) {
             const content = response.candidates[0].content;
             if (content && content.parts) {
                 for (const part of content.parts) {
                     if (part.inlineData && part.inlineData.data) {
                         base64Image = part.inlineData.data;
                         break;
                     }
                 }
             }
        }

        if (!base64Image) {
            // Check for refusal/safety
            const finishReason = response.candidates?.[0]?.finishReason;
            if (finishReason) {
                 throw new Error(`Model refused to generate image. Reason: ${finishReason}`);
            }
            throw new Error("No image generated.");
        }

        return {
            prompt: prompt,
            imageData: base64Image
        };

    } catch (error: any) {
        let message = error.message || "Unknown error";
        // Provide more user-friendly messages for common errors
        if (message.includes("400")) {
             message = "The model refused the request. Please try a different prompt or fewer reference images.";
        } else if (message.includes("SAFETY")) {
             message = "Generation blocked by safety filters. Please adjust your prompt.";
        }
        throw new Error(message);
    }
};
