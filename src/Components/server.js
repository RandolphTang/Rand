const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(express.json());

const PORT = process.env.PORT || 3001;
const DISCORD_BOT_TOKEN = 'MTI0MDQwNzA3MDI0MzgxNTQzNQ.GbLGGi.AvhV0W7sbDvR9z18qp3cn9Ebx8TZLKpyRMVd0o';
const DISCORD_CHANNEL_ID = '1240408403486965773';

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.post('/send-discord-message', (req, res) => {
    const { message } = req.body;

    axios.post(`https://discord.com/api/v9/channels/${DISCORD_CHANNEL_ID}/messages`, {
        content: message
    }, {
        headers: {
            'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
        }
    })
        .then(response => {
            res.send({ success: true });
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error);
            res.status(500).send({ success: false });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});