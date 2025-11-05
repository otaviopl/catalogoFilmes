import axios from 'axios';

// Agora apontamos para as rotas internas do Next, que fazem proxy
const api = axios.create({
	baseURL: '/api/movies',
	headers: { 'Content-Type': 'application/json' }
});

export default api;


