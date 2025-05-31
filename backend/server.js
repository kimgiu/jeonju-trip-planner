const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// ① 로컬 테스트(로컬:3000)와 프로덕션 도메인(프론트) 모두 허용
app.use(cors({
  origin: [
    'http://localhost:3000',                          // 로컬 테스트 시
    'https://jeonju-trip-planner.onrender.com'         // 배포된 프론트 도메인
  ],
  credentials: true
}));

const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate', async (req, res) => {
  const { startDate, days, language } = req.body;
  try {
    const lang = (language === 'ko' ? '한국어로' : '영어로');
    const prompt = `
${startDate}부터 ${days}일간 전주 여행 일정을 ${lang} 아침-점심-저녁 등 시간대별로 나눠서,
각 여행지 방문 후 가까운 음식점(이름/추천메뉴/가격/전화/주소)도 추천해주고,
매일 밤엔 숙소 3개(저가/중가/고가) 추천(이름/가격/전화/주소)해줘.
전체를 표로 만들어 날짜/시간/여행지/음식점/숙소를 각각 칸에 구분해서 작성해줘.
실제 전주 현지 장소 위주로 알려줘.
`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o"
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
