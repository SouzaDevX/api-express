const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/roblox-inventory', async (req, res) => {
    const userId = '1800053475';
    const assetTypeId = '12';

    const url = `https://inventory.roblox.com/v2/users/${userId}/inventory/${assetTypeId}?limit=100&cursor=`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Falha ao buscar dados da API do Roblox' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
