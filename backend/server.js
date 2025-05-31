const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 배포된 프론트 엔드 도메인(https)으로 바꿔야 합니다.
app.use(cors({ origin:'https://jeonju-trip-planner.onrender.com/api/generate'}));

app.use(express.json());

// OpenAI 설정 부분 생략...
// app.post('/api/generate', ...)

// 포트 바인딩
app.listen(process.env.PORT || 10000, () => {
  console.log(`Server listening on port ${process.env.PORT || 10000}`);
});