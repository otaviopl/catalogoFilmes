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
		year: movie.ano,
		director: movie.director
	};
}

function toExternal(body) {
	return {
		nome: body.title ?? body.nome,
		genero: body.genre ?? body.genero,
		ano: body.year ?? body.ano,
		director: body.director
	};
}

export async function GET(_req, { params }) {
	try {
		const { id } = params;
		const { data } = await external.get(`/${id}`);
		return NextResponse.json(toInternal(data));
	} catch (err) {
		return NextResponse.json({ message: 'Upstream error' }, { status: 502 });
	}
}

export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const body = await request.json();
		const payload = toExternal(body);
		const { data } = await external.put(`/${id}`, payload);
		return NextResponse.json(toInternal(data));
	} catch (err) {
		return NextResponse.json({ message: 'Upstream error' }, { status: 502 });
	}
}

export async function DELETE(_req, { params }) {
	try {
		const { id } = params;
		await external.delete(`/${id}`);
		return new NextResponse(null, { status: 204 });
	} catch (err) {
		return NextResponse.json({ message: 'Upstream error' }, { status: 502 });
	}
}


