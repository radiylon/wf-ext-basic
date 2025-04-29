# Webflow Design Extension: Text Generator

This is a Webflow Designer Extension that helps you generate AI-powered text content directly in the Designer. Simply select a text element, enter your OpenAI API key, describe how you'd like to change the text, and the extension will use `gpt-4.1-nano` to generate and update the content in place. Features include:

- Text generation powered by OpenAI's chat completion models (gpt-4.1-nano)
- BYO API Key
- Support for updating any text element in the Designer

Explore the [documentation](https://developers.webflow.com/designer/reference/introduction) for detailed information on Designer Extension features and API.


<img width="889" alt="Screenshot 2025-04-28 at 11 08 23 PM" src="https://github.com/user-attachments/assets/b0f25542-a4c6-4091-99e0-24046992158b" />

## Setup

```bash
npm install
```

```bash
npm run dev
```

This command installs dependencies, watches for changes in the `src/` folder, and serves your extension files from `./dist/`. Use the displayed URL as the "Development URL" in Webflow Designer's Apps panel to launch your extension.

## Prerequisites

- An OpenAI API Key - Required for text generation functionality
- Webflow Site - A site where you can test and use the extension

## Learnings
- Understanding Webflow local setup using development apps
- Working with basic Webflow API methods using the Designer V2 API reference
- Integrating OpenAI with Webflow APIs
