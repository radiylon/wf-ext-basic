import React from "react";

export default function App() {
  const addText = async () => {
    // Get the current selected Element
    const el = await webflow.getSelectedElement();

    // If text content can be set, update it!
    if (el && el.textContent) {
      await el.setTextContent("hello world!");
    } else {
      alert("Please select a text element");
    }
  };

  return (
    <div>
      <h1>Welcome to My React App!</h1>
      <p>This is a basic React application.</p>
      <button onClick={addText}>Add text</button>
    </div>
  );
}