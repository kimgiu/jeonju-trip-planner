import React from "react";

export default function ItineraryResult({ text }) {
  if (!text) return null;

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">📅 생성된 여행 일정</h2>
      <ul className="space-y-1">
        {lines.map((line, idx) => (
          <li key={idx} className="text-gray-800 whitespace-pre-line">{line}</li>
        ))}
      </ul>
    </div>
  );
}
