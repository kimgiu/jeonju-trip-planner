import React, { useState } from "react";
import axios from "axios";

export default function ItineraryForm({ onResult }) {
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(2);
  const [language, setLanguage] = useState("한국어");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://jeonju-backend.onrender.com/api/generate', {
        startDate,
        days,
        language,
      });

      onResult(res.data.itinerary); // 부모에 전달
    } catch (err) {
      alert("GPT 일정 생성 실패: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-medium">여행 시작일:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="border rounded px-3 py-2 w-full" />
      </div>
      <div>
        <label className="block mb-1 font-medium">여행 일수:</label>
        <input type="number" min={1} max={10} value={days} onChange={(e) => setDays(e.target.value)} required className="border rounded px-3 py-2 w-full" />
      </div>
      <div>
        <label className="block mb-1 font-medium">언어 선택:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-3 py-2 w-full">
          <option>한국어</option>
          <option>English</option>
          <option>日本語</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        일정 생성하기
      </button>
    </form>
  );
}
