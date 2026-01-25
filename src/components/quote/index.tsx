import { useState, useEffect } from "react";

// Sample quote list
const QUOTES = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Do something today that your future self will thank you for.",
  "Small steps every day lead to big results.",
  "Focus on progress, not perfection.",
  "Don't watch the clock; do what it does. Keep going.",
];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
  }, []);

  return (
    <div
      style={{
        fontStyle: "italic",
        fontSize: 14,
        color: "#555",
        margin: "10px 0",
        padding: "8px",
        borderLeft: "3px solid #0969da",
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
      }}
    >
      💡 {quote}
    </div>
  );
}
