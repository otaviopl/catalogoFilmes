'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '@/services/movies';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	// Página inicial exibe apenas ID e Nome

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const list = await getMovies();
				setMovies(Array.isArray(list) ? list : []);
			} catch (e) {
				setError('Falha ao carregar filmes. Verifique a API.');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	async function handleDelete(id) {
		if (!confirm('Excluir este filme?')) return;
		try {
			await deleteMovie(id);
			setMovies(prev => prev.filter(m => m.id !== id));
		} catch (e) {
			alert('Erro ao excluir.');
		}
	}

	return (
		<section>
			<h1 style={{margin:'8px 0 16px'}}>Início</h1>
			<div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
				<Link href="/movies/new"><Button>Criar</Button></Link>
			</div>

			{loading && <p>Carregando...</p>}
			{error && <p style={{color:'crimson'}}>{error}</p>}

			{!loading && !error && (
				<Card>
					<table>
						<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
							<th style={{width:80}}></th>
						</tr>
						</thead>
						<tbody>
						{movies.map(movie => (
							<tr key={movie.id}>
								<td>{movie.id}</td>
								<td><Link href={`/movies/${movie.id}`}>{movie.title}</Link></td>
								<td>
									<button
										onClick={() => handleDelete(movie.id)}
										className="btn btn-danger"
										title="Excluir"
										style={{padding:'6px 10px'}}
									>
										🗑️
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</Card>
			)}
		</section>
	);
}


