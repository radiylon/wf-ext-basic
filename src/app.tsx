import { useState, useEffect } from 'react';
import { useOpenAI } from './hooks/useOpenAI';

const MAX_CHARS = 200;

function App() {
  const [description, setDescription] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { generateText, isLoading, error } = useOpenAI({ apiKey });

  useEffect(() => {
    void (async () => {
      await webflow.setExtensionSize('large');
    })();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setDescription(text);
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value.trim());
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      await webflow.notify({ type: "Error", message: "Please enter your OpenAI API key" });
      return;
    }

    try {
      const element = await webflow.getSelectedElement() as DOMElement;

      if (!element?.textContent && !element?.children) {
        await webflow.notify({ type: "Error", message: "Please select a text element" });
        return;
      }

      const children = await element.getChildren();
      const strings = children.filter(child => child.type === "String");
      const textContentArr = [];

      for (const myString of strings) {
        if (myString.type === "String") {
          const text = await myString.getText();
          textContentArr.push(text);
        }
      }

      const textContent = textContentArr.join("");

      const generatedText = await generateText({ description, textContent });
      await element.setTextContent(generatedText);
      await webflow.notify({ type: "Success", message: "Text updated successfully!" });
    } catch {
      await webflow.notify({ 
        type: "Error", 
        message: error || "Failed to generate text. Please try again." 
      });
    }
  };

  return (
    <div className="p-4 flex flex-col items-center max-w-2xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">Rad Text Content Generator</h1>
      <p className="text-gray-300 mb-8 text-center">Select a text element and describe how you'd like to change it. Updates the element in place with an AI-generated result.</p>
      <div className="w-full mb-6">
        <label className="block text-blue-300 mb-2 font-medium">
          API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your OpenAI API key"
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
        />
        <div className="mt-2 text-gray-400 text-sm text-center">
          Your API key is required to generate text. It will not be stored or transmitted anywhere except to OpenAI.
        </div>
      </div>

      <div className="w-full mb-6">
        <label className="block text-blue-300 mb-2 font-medium">
          Prompt
        </label>
        <textarea
          value={description}
          onChange={handleInputChange}
          placeholder="Example: Make this text more engaging..."
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors min-h-[100px]"
        />
        <span className="text-gray-400 text-sm text-right block hover:text-blue-400 transition-colors">{description.length}/{MAX_CHARS}</span>
      </div>

      <button 
        onClick={handleGenerate}
        disabled={isLoading || description.length === 0 || !apiKey}
        className={`w-full py-3 px-4 rounded font-medium text-white transition-all
          ${isLoading || !apiKey || description.length === 0 
            ? 'bg-gray-600 cursor-not-allowed opacity-70' 
            : 'bg-blue-500 hover:bg-blue-400 shadow-lg hover:shadow-blue-500/50'
          }`}
      >
        {isLoading ? "Generating..." : "Generate Content"}
      </button>
    </div>
  );
}

export default App
