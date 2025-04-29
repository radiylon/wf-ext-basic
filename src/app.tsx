import React, { useEffect, useState } from "react";
import { useOpenAI } from "./hooks/useOpenAI";

const MAX_CHARS = 100;

export default function App() {
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
      // Get the current selected Element
      const element = await webflow.getSelectedElement() as DOMElement;

      if (!element?.textContent && !element?.children) {
        await webflow.notify({ type: "Error", message: "Please select a text element" });
        return;
      }

      // Get Child Elements
      const children = await element.getChildren();

      // Filter string elements from children
      const strings = children.filter(child => child.type === "String");

      // Initialize an array to hold text content
      const textContentArr = [];

      // Loop over string elements to get text
      for (const myString of strings) {
        if (myString.type === "String") {
          const text = await myString.getText();
          textContentArr.push(text);
        }
      }

      const textContent = textContentArr.join("");
      console.log(textContent);

      // Generate and set the text
      const generatedText = await generateText({ description, textContent });
      await element.setTextContent(generatedText);
      await webflow.notify({ type: "Success", message: "Text updated successfully!" });
      
      // Clear the input
      setDescription("");
    } catch (err) {
      await webflow.notify({ 
        type: "Error", 
        message: error || "Failed to generate text. Please try again." 
      });
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your OpenAI API key"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <div style={{ fontSize: "12px", color: "#666" }}>
          Your API key is required to generate text. It will not be stored or transmitted anywhere except to OpenAI.
        </div>
      </div>

      <textarea
        value={description}
        onChange={handleInputChange}
        placeholder="Tell me how you'd like to change this content..."
        style={{
          width: "100%",
          minHeight: "80px",
          marginBottom: "8px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        marginBottom: "16px",
        fontSize: "12px"
      }}>
        <span style={{ 
          color: description.length === MAX_CHARS ? "#ff4444" : "#666" 
        }}>
          {description.length}/{MAX_CHARS}
        </span>
      </div>
      <button 
        onClick={handleGenerate}
        disabled={isLoading || description.length === 0 || !apiKey}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: (isLoading || !apiKey) ? "not-allowed" : "pointer",
          opacity: (isLoading || !apiKey) ? 0.7 : 1
        }}
      >
        {isLoading ? "Generating..." : "Generate Content"}
      </button>
    </div>
  );
}