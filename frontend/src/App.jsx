import React, { useState } from 'react';
import axios from 'axios';
import PlanTable from './components/PlanTable';
import ItineraryForm from './components/ItineraryForm';

function App() {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    try {
      const prompt = `
${formData.startDate}부터 ${formData.days}일간 전주 여행 일정을 ${formData.language === 'ko' ? '한국어로' : '영어로'} 시간대별로 짜줘.
${formData.foodDetail ? '각 장소 주변 음식점을 이름, 추천메뉴, 가격, 예약전화번호, 주소 포함하여 추천해줘.' : ''}
${formData.hotelDetail ? '매일 밤 숙소를 가격대별로 3개씩 추천해줘. 이름, 가격, 예약전화번호, 주소 포함해줘.' : ''}
전체 일정을 표로 구성해줘.`;

      const response = await axios.post('https://jeonju-backend.onrender.com/api/generate', {
        startDate: formData.startDate,
        days: formData.days,
        language: formData.language,
        prompt
      });
      setPlan(response.data.plan);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>전주 여행 일정 생성기</h1>
      <ItineraryForm onGenerate={handleGenerate} />
      {loading ? <p>일정을 불러오는 중입니다...</p> : <PlanTable plan={plan} />}
    </div>
  );
}

export default App;
