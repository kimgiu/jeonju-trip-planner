import React, { useState } from 'react';

function App() {
  // 화면 최소 UI 보이도록 임시 변수
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <header className="bg-green-600 py-5">
        <h1 className="text-3xl text-white font-bold text-center">나홀로 떠나는 전주여행</h1>
      </header>
      <section className="bg-white shadow-md rounded-lg mx-auto px-6 py-8 mb-8 max-w-3xl mt-8">
        <h2 className="text-2xl font-semibold mb-4">나만의 전주여행 일정 만들기</h2>
        {/* 나중에 폼 들어올 자리 */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">여행 시작일</label>
          <input type="date" className="border px-2 py-1" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">여행 일정 생성하기</button>
      </section>
    </div>
  );
}

export default App;
