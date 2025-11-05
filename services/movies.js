import api from './api';

// A baseURL já deve apontar para a coleção (ex.: .../movies)
// Portanto usamos apenas sufixos relativos "" e "/:id"

export async function getMovies() {
	const { data } = await api.get('');
	return data;
}

export async function getMovie(id) {
	const { data } = await api.get(`/${id}`);
	return data;
}

export async function createMovie(payload) {
	const { data } = await api.post('', payload);
	return data;
}

export async function updateMovie(id, payload) {
	const { data } = await api.put(`/${id}`, payload);
	return data;
}

export async function deleteMovie(id) {
	await api.delete(`/${id}`);
}


