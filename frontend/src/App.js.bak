import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [date, setDate] = useState('');
  const [interests, setInterests] = useState('');
  const [language, setLanguage] = useState('한국어');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://jeonju-trip-planner.onrender.com/api/generate-plan', {
        date,
        interests,
        language,
      });
      setPlan(response.data.plan);
    } catch (error) {
      console.error('API 호출 실패', error);
      setPlan('일정 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>전주 여행 일정 생성기</h1>
      
      <div>
        <label>여행 날짜:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>관심사:</label>
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
      </div>

      <div>
        <label>언어 선택:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="한국어">한국어</option>
          <option value="English">English</option>
        </select>
      </div>

      <button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? '일정 생성 중...' : '일정 생성하기'}
      </button>

      <div>
        <h3>여행 일정:</h3>
        <pre>{plan}</pre>
      </div>
    </div>
  );
}

export default App;