import React, { useState } from 'react';
import axios from 'axios';
import PlanTable from './components/PlanTable';

function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [nights, setNights] = useState(1);
  const [language, setLanguage] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [planArray, setPlanArray] = useState([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://jeonju-backend.onrender.com/api/generate', {
        startDate,
        nights,
        language,
      });
      let planData = response.data.plan;
      // plan이 배열이 아닐 경우에도 안전하게 처리
      if (!Array.isArray(planData)) planData = [planData];
      setPlanArray(planData);
    } catch (err) {
      setPlanArray([]);
      alert(`일정 생성에 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <section className="bg-white shadow-md rounded-lg mx-auto px-6 py-8 mb-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">나만의 전주여행 일정 만들기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 여행 시작일 */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">여행 시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {/* 숙박일수 */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">숙박 일수</label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}박
                </option>
              ))}
            </select>
          </div>
          {/* 언어 선택 */}
          <div className="col-span-1">
            <label className="block text-gray-700 mb-1">언어 선택</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full text-white font-semibold py-2 px-4 rounded ${
            loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? '생성 중...' : '여행 일정 생성하기'}
        </button>
      </section>
      <section className="container mx-auto px-4">
        <PlanTable planArray={planArray} />
      </section>
    </div>
  );
}

export default App;
