# Be!Myn Studio 📸✨

**Be!Myn Studio** is an advanced AI-powered product photography application that acts as your virtual creative director. It transforms simple product reference images into professional, high-quality marketing assets using Google's Gemini 2.5 models.

## 🚀 Overview

Designed for e-commerce brands and content creators, Be!Myn Studio eliminates the need for expensive photoshoots. Users can upload a product image or select from a catalog, define a theme (e.g., "Luxury minimalist podium"), and generate stunning visuals in seconds.

The application leverages a dual-model approach:
1.  **Gemini 2.5 Flash** acts as the creative director, generating detailed, photographer-grade prompts based on your theme, style, and product details.
2.  **Gemini 2.5 Flash Image** acts as the photographer, generating high-resolution visuals that adhere strictly to those prompts and your specific reference image.

## ✨ Key Features

### 🧠 AI-Powered Workflow
*   **Smart Product Identification:** Upload any image, and the app uses Gemini Vision to automatically identify the product category.
*   **Virtual Creative Director:** Converts simple user themes into complex, professional photography prompts (handling lighting, composition, and texture details).
*   **Reference-Guided Generation:** Uses the uploaded image as a strict reference to ensure brand consistency in the generated output.

### 🎨 Customization & Control
*   **Style Presets:** Choose from *Natural*, *Studio*, *Artistic*, or *Photoshoot* styles.
*   **Model Integration:** Option to generate images with or without human models.
*   **Aspect Ratios:** Support for Square (1:1), Wide (16:9), and Tall (9:16) formats.
*   **🇮🇳 Indian Context Mode:** A dedicated toggle that intelligently adapts scenes, props, and backgrounds to fit modern Indian aesthetics.

### ⚡ Performance & UX
*   **Real-time Batch Generation:** Generate up to 8 images in a single run with a streaming gallery experience.
*   **Dark/Light Mode:** Fully responsive UI with seamless theme switching.
*   **Export Tools:** Download individual images, copy prompts to clipboard, or export the entire batch as a ZIP file.

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **AI SDK:** `@google/genai` (Google GenAI SDK)
*   **Models:**
    *   `gemini-2.5-flash` (Prompt Engineering & Vision)
    *   `gemini-2.5-flash-image` (Image Generation)

## ⚙️ Local Development Setup

Follow these instructions to run Be!Myn Studio on your local machine.

### Prerequisites

*   **Node.js**: Ensure you have Node.js (v18 or higher) installed.
*   **Google API Key**: You need a valid API key from [Google AI Studio](https://aistudio.google.com/).
    *   *Note: Ensure your API key has access to the Gemini 2.5 Flash and Image Generation models.*

### Installation Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/bemyn-studio.git
    cd bemyn-studio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory of the project.
    ```bash
    touch .env
    ```
    Add your API key to the file. The application expects the key to be available via `process.env.API_KEY`.
    ```env
    API_KEY=your_actual_api_key_here
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the local URL provided (usually `http://localhost:5173`).

## 📖 How to Use

1.  **Select a Product:** Choose an item from the catalog grid or click the "Upload" tile to use your own image.
2.  **Define the Theme:** Enter a descriptive theme (e.g., "Summer skincare on a beach rock").
3.  **Refine Settings:**
    *   Add specific product details if needed.
    *   Select a style (e.g., Studio).
    *   Choose whether to include a model.
    *   Set the aspect ratio and image count.
4.  **Generate:** Click "Generate Images". The AI will first craft prompts and then stream the generated images into the gallery.
5.  **Download:** Save your favorites or download the entire batch as a ZIP.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).