// src/components/ChatBot.jsx
export default function ChatBot() {
  return (
    <iframe
      title="ISH Cosmetics Support Bot"
      src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/14/02/20251214025833-Q5CSJE1N.json"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 350,
        height: 500,
        border: "none",
        zIndex: 9999,
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
    />
  );
}
