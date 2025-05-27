const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

// 예시 루트 라우트 추가
app.get('/', (req, res) => {
  res.send('서버가 정상 작동 중입니다!');
});

// 기존 라우트들 추가...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
