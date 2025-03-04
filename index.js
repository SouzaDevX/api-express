const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Você pode alterar para qualquer porta

// Endpoint que fará a requisição para a API do Roblox
app.get('/roblox-inventory', async (req, res) => {
    // Obtém o userId e assetTypeId dos parâmetros da URL
    const { userId, assetTypeId } = req.query;

    // Verifica se os parâmetros userId e assetTypeId foram fornecidos
    if (!userId || !assetTypeId) {
        return res.status(400).json({ error: 'userId e assetTypeId são obrigatórios!' });
    }

    // Construa a URL com os parâmetros fornecidos
    const url = `https://inventory.roblox.com/v2/users/${userId}/inventory/${assetTypeId}?limit=100&cursor=`;

    try {
        // Fazendo a requisição para a API do Roblox
        const response = await axios.get(url);

        // Retorna os dados da API para o cliente
        res.json(response.data);
    } catch (error) {
        // Se houver erro na requisição, envie uma mensagem de erro
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Falha ao buscar dados da API do Roblox' });
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
