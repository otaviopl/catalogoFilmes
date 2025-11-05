import { NextResponse } from 'next/server';
import axios from 'axios';

const EXTERNAL_BASE_URL = process.env.EXTERNAL_API_BASE_URL || 'https://690bd2c76ad3beba00f6446a.mockapi.io/api/movies/movies';

const external = axios.create({
	baseURL: EXTERNAL_BASE_URL,
	headers: { 'Content-Type': 'application/json' }
});

function toInternal(movie) {
	return {
		id: movie.id,
		title: movie.nome,
		genre: movie.genero,
		year: movie.ano
	};
}

function toExternal(body) {
	return {
		nome: body.title ?? body.nome,
		genero: body.genre ?? body.genero,
		ano: body.year ?? body.ano
	};
}

export async function GET() {
	try {
		const { data } = await external.get('');
		const result = Array.isArray(data) ? data.map(toInternal) : [];
		return NextResponse.json(result);
	} catch (err) {
		return NextResponse.json({ message: 'Upstream error' }, { status: 502 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const payload = toExternal(body);
		const { data } = await external.post('', payload);
		return NextResponse.json(toInternal(data), { status: 201 });
	} catch (err) {
		return NextResponse.json({ message: 'Upstream error' }, { status: 502 });
	}
}


