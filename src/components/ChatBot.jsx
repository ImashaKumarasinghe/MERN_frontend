// src/components/ChatBot.jsx
import { useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#5f4663ff",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          fontSize: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        💬
      </button>

      {/* Chat iframe */}
      {isOpen && (
        <iframe
          title="ISH Cosmetics ChatBot"
          src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/14/02/20251214025833-Q5CSJE1N.json"
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            border: "none",
            zIndex: 9999,
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        />
      )}
    </>
  );
}
