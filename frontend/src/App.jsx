
import React, { useState } from 'react';
import axios from 'axios';
import PlanTable from './components/PlanTable';

function App() {
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://jeonju-backend.onrender.com/api/generate', {
                startDate: '2025-06-01',
                days: 3,
                language: 'ko'
            });
            setPlan(response.data.plan);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>전주 여행 일정 생성기</h1>
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? '생성 중...' : '여행 일정 생성하기'}
            </button>
            <PlanTable plan={plan} />
        </div>
    );
}

export default App;
