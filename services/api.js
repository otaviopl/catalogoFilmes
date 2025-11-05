import axios from 'axios';

// Configure a baseURL pointing DIRECTLY to the collection endpoint on MockAPI
// Exemplo: https://<subdominio>.mockapi.io/api/v1/movies
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: { 'Content-Type': 'application/json' }
});

export default api;


