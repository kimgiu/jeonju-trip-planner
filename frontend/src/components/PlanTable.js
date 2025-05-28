import React from 'react';

const PlanTable = ({ plan }) => {
  if (!plan || plan.length === 0) return <p>일정을 불러오는 중입니다...</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>날짜</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>일정</th>
        </tr>
      </thead>
      <tbody>
        {plan.map((item, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.date}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.activities}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlanTable;