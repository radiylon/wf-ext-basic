# Webflow Designer Extension + React + TypeScript + Vite + TailwindCSS Starter
This is a Webflow Designer Extension that helps you generate AI-powered text content directly in the Designer. Simply select a text element, enter your OpenAI API key, describe how you'd like to change the text, and the extension will use `gpt-4.1-nano` to generate and update the content in place.

<img width="672" alt="Screenshot 2025-04-30 at 5 26 30 PM" src="https://github.com/user-attachments/assets/a6ca8fa7-fc76-4622-8aca-a30c333c446f" />

## Features
- Text generation powered by OpenAI's chat completion models (gpt-4.1-nano)
- BYO API Key
- Support for updating any text element in the Designer

## Prerequisites
Before you begin, ensure you have:
- Node.js (v18 or higher)
- npm or yarn
- A Webflow account with Designer Extension development access

## Getting Started
1. Clone this repository:
```bash
git clone [repository-url]
cd wf-ext-vite-react-tailwind-starter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```
This will generate a `bundle.zip` file that you can upload to Webflow.

## Learnings
- Understanding Webflow local setup using development apps
- Working with basic Webflow API methods using the Designer V2 API reference
- Integrating OpenAI with Webflow APIs
