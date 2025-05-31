import React, { useState } from 'react';
import axios from 'axios';
import PlanTable from './components/PlanTable.jsx';

function App() {
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  setLoading(true);
  console.log("🟢 일정 생성 시작"); // ✅ 요청 시작 로그

  try {
    const response = await axios.post('https://jeonju-backend.onrender.com/api/generate', {
      startDate: '2025-06-01',
      days: 3,
      language: 'ko'
    });
    console.log("✅ GPT 응답 수신:", response.data); // ✅ 응답 확인

    setPlan(response.data.plan);
  } catch (error) {
    console.error("❌ GPT 요청 실패:", error); // ❌ 에러 로그
    alert("GPT 요청에 실패했습니다: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h1>전주 여행 일정 생성기</h1>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '생성 중...' : '여행 일정 생성하기'}
      </button>
      <PlanTable plan={plan} />
    </div>
  );
}

export default App;