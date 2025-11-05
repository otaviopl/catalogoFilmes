'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMovies } from '@/services/movies';

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



	return (
		<section>
			<h1 style={{margin:'8px 0 16px'}}>Início</h1>
			<div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
				<Link href="/movies/new"><button style={{padding:'8px 12px'}}>Criar</button></Link>
			</div>

			{loading && <p>Carregando...</p>}
			{error && <p style={{color:'crimson'}}>{error}</p>}

			{!loading && !error && (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nome</th>
						</tr>
					</thead>
					<tbody>
						{movies.map(movie => (
							<tr key={movie.id}>
								<td>{movie.id}</td>
								<td><Link href={`/movies/${movie.id}`}>{movie.title}</Link></td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</section>
	);
}


