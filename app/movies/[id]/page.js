'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovie } from '@/services/movies';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function MovieDetailsPage() {
	const params = useParams();
	const id = params?.id;
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) return;
		(async () => {
			try {
				setLoading(true);
				const data = await getMovie(id);
				setMovie(data);
			} catch (e) {
				setError('Falha ao carregar filme.');
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	if (loading) return <p>Carregando...</p>;
	if (error) return <p style={{color:'crimson'}}>{error}</p>;
	if (!movie) return <p>Não encontrado.</p>;

	return (
		<section>
			<h1 style={{margin:'8px 0 16px'}}>Detalhes</h1>
			<Card style={{maxWidth:560}}>
				<div style={{display:'grid',gap:8}}>
					<div><strong>Título:</strong> {movie.title}</div>
					<div><strong>Gênero:</strong> {movie.genre}</div>
					<div><strong>Ano:</strong> {movie.year}</div>
				</div>
				<div style={{marginTop:16,display:'flex',gap:12}}>
					<Link href={`/movies/${movie.id}/edit`}><Button>Editar</Button></Link>
					<Link href="/"><Button variant="secondary">Cancelar</Button></Link>
				</div>
			</Card>
		</section>
	);
}


