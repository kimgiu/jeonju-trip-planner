const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
    const itinerary = {
        message: "전주 여행 일정 예시입니다.",
        input: req.body.input
    };
    res.json(itinerary);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
