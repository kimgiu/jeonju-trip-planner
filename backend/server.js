const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// 로컬 개발용 CORS 허용 (프론트 dev 서버는 기본적으로 http://localhost:5173)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://jeonju-trip-planner.onrender.com'
  ]
}));

const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// server.js (Express 백엔드)
app.post('/api/generate', async (req, res) => {
  const { startDate, days, language } = req.body;
  try {
    // 언어 변수
    const lang = (language === 'ko' || language === 'kr' || language === '한국어')
      ? "한국어로"
      : (language === 'en' || language === '영어') ? "영어로" : "";

    // ★★★ 프롬프트 핵심 부분 ★★★
    const prompt = `${startDate}부터 ${days}일간 전주 여행 일정을 ${lang} 아침-점심-저녁 등 시간대별로 나눠서, 
각 여행지 방문 후 가까운 맛집(음식점)도 한 군데씩 추천해주고, 
매일 밤엔 추천 숙소도 하나씩 넣어서 알려줘. 
표 형태로 날짜/시간/여행지/추천 음식점/추천 숙소를 꼭 모두 포함해서 작성해줘.`;

    const completion = await openai.chat.completions.create({
      messages: [{
        role: "system",
        content: prompt
      }],
      model: "gpt-4o", // 또는 gpt-3.5-turbo
    });
    res.json({ plan: completion.choices[0].message.content });
  } catch (error) {
    console.error("GPT API 호출 실패:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});