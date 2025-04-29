import React, { useEffect, useState } from "react";
import { useOpenAI } from "./hooks/useOpenAI";

const MAX_CHARS = 200;

const baseStyles = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px"
};

const inputStyles = {
  ...baseStyles,
  width: "100%",
  padding: "12px",
  marginBottom: "4px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px"
};

const labelStyles = {
  ...baseStyles,
  display: "block",
  marginBottom: "8px",
  color: "white",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center" as const
};

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

      // Generate and set the text
      const generatedText = await generateText({ description, textContent });
      await element.setTextContent(generatedText);
      await webflow.notify({ type: "Success", message: "Text updated successfully!" });
    } catch (err) {
      await webflow.notify({ 
        type: "Error", 
        message: error || "Failed to generate text. Please try again." 
      });
    }
  };

  return (
    <div style={{ 
      ...baseStyles, 
      padding: "16px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1>Rad Text Content Generator</h1>
      <p>Select a text element and describe how you'd like to change it. Updates the element in place with an LLM response.</p>
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <label style={labelStyles}>
          API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your OpenAI API key"
          style={inputStyles}
        />
        <div style={{ 
          ...baseStyles, 
          fontSize: "13px", 
          color: "#fff333",
          textAlign: "center"
        }}>
          Your API key is required to generate text. It will not be stored or transmitted anywhere except to OpenAI.
        </div>
      </div>

      <div style={{ width: "100%", marginBottom: "16px" }}>
        <label style={labelStyles}>
          Prompt
        </label>
        <textarea
          value={description}
          onChange={handleInputChange}
          placeholder="Example: Make this text more engaging..."
          style={{
            ...inputStyles,
            minHeight: "100px",
            marginBottom: "8px",
          }}
        />
        <div style={{ 
          ...baseStyles,
          display: "flex", 
          justifyContent: "center",
          marginBottom: "16px",
          fontSize: "13px"
        }}>
          <span style={{ color: "white" }}>
            {description.length}/{MAX_CHARS}
          </span>
        </div>
      </div>
      <button 
        onClick={handleGenerate}
        disabled={isLoading || description.length === 0 || !apiKey}
        style={{
          ...baseStyles,
          width: "100%",
          padding: "12px",
          backgroundColor: "#146EF5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: (isLoading || !apiKey) ? "not-allowed" : "pointer",
          opacity: (isLoading || !apiKey) ? 0.7 : 1,
          fontSize: "16px",
          fontWeight: 500
        }}
      >
        {isLoading ? "Generating..." : "Generate Content"}
      </button>
    </div>
  );
}