const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// GPT 연결
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate-plan', async (req, res) => {
  try {
    const { date, interests, language } = req.body;

    const prompt = `
당신은 여행 플래너입니다. 사용자가 '${interests}'에 관심이 있고, 전주를 '${date}'에 여행한다고 할 때,
그에 맞는 전주 여행 일정을 하루 단위로 구성해 주세요. 출력은 ${language}로 해주세요.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const plan = completion.choices[0].message.content;
    res.json({ plan });
  } catch (error) {
    console.error('GPT 일정 생성 오류:', error);
    res.status(500).json({ error: '일정 생성 실패' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});