import React, { useState } from 'react';

function ItineraryForm({ onGenerate }) {
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(3);
  const [language, setLanguage] = useState('ko');
  const [foodDetail, setFoodDetail] = useState(true);
  const [hotelDetail, setHotelDetail] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      startDate,
      days: Number(days),
      language,
      foodDetail,
      hotelDetail
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <table>
        <tbody>
          <tr>
            <td>여행 시작일:</td>
            <td><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required /></td>
          </tr>
          <tr>
            <td>여행 일수:</td>
            <td>
              <select value={days} onChange={e => setDays(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <option key={d} value={d}>{d}일</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>언어:</td>
            <td>
              <select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="ko">한국어</option>
                <option value="en">영어</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>음식점 상세 정보 포함:</td>
            <td>
              <input type="checkbox" checked={foodDetail} onChange={e => setFoodDetail(e.target.checked)} /> 예 (메뉴/가격/주소/전화 포함)
            </td>
          </tr>
          <tr>
            <td>숙소 추천 포함:</td>
            <td>
              <input type="checkbox" checked={hotelDetail} onChange={e => setHotelDetail(e.target.checked)} /> 예 (가격대/주소/전화 포함)
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" style={{ marginTop: '1rem' }}>여행 일정 생성하기</button>
    </form>
  );
}

export default ItineraryForm;
