'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getMovie, updateMovie } from '@/services/movies';
import Card from '@/components/ui/Card';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

export default function EditMoviePage() {
	const router = useRouter();
	const [movieId, setMovieId] = useState('');
	const [movie, setMovie] = useState(null);
	const [form, setForm] = useState({ title: '', genre: '', year: '' });
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [notFound, setNotFound] = useState(false);

	// Estado inicial: exibir campo para digitar ID
	function handleSearch(e) {
		e.preventDefault();
		if (!movieId.trim()) return;
		
		setLoading(true);
		setNotFound(false);
		setMovie(null);

		getMovie(movieId.trim())
			.then(data => {
				setMovie(data);
				setForm({
					title: data.title || '',
					genre: data.genre || '',
					year: String(data.year ?? '')
				});
			})
			.catch(() => {
				setNotFound(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function handleCancel() {
		router.push('/');
	}

	function onChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	async function handleUpdate(e) {
		e.preventDefault();
		try {
			setSaving(true);
			await updateMovie(movieId, { ...form });
			router.push('/');
		} catch (err) {
			alert('Erro ao salvar alterações.');
		} finally {
			setSaving(false);
		}
	}

	// Renderização condicional: Estado inicial - campo para digitar ID
	if (!movie && !notFound && !loading) {
		return (
			<section>
				<h1 style={{margin:'8px 0 16px'}}>Alterar</h1>
				<Card style={{maxWidth: 560}}>
					<form onSubmit={handleSearch} style={{display:'grid',gap:12}}>
						<InputField 
							label="ID do Filme" 
							name="movieId" 
							value={movieId} 
							onChange={(e) => setMovieId(e.target.value)} 
							required 
						/>
						<div style={{display:'flex',gap:12}}>
							<Button type="submit">Procura</Button>
							<Button variant="secondary" type="button" onClick={handleCancel}>Cancela</Button>
						</div>
					</form>
				</Card>
			</section>
		);
	}

	// Renderização condicional: Carregando
	if (loading) {
		return (
			<section>
				<h1 style={{margin:'8px 0 16px'}}>Alterar</h1>
				<Card style={{maxWidth: 560}}>
					<p>Carregando...</p>
				</Card>
			</section>
		);
	}

	// Renderização condicional: Não encontrado
	if (notFound) {
		return (
			<section>
				<h1 style={{margin:'8px 0 16px'}}>Alterar</h1>
				<Card style={{maxWidth: 560}}>
					<p style={{color:'crimson', marginBottom: 16}}>Filme não encontrado.</p>
					<Button onClick={handleCancel}>Voltar para Início</Button>
				</Card>
			</section>
		);
	}

	// Renderização condicional: Filme encontrado - exibir formulário
	if (movie) {
		return (
			<section>
				<h1 style={{margin:'8px 0 16px'}}>Alterar</h1>
				<Card style={{maxWidth: 560}}>
					<form onSubmit={handleUpdate} style={{display:'grid',gap:12}}>
						<InputField label="Título" name="title" value={form.title} onChange={onChange} required />
						<InputField label="Gênero" name="genre" value={form.genre} onChange={onChange} />
						<InputField label="Ano" type="text" name="year" value={form.year} onChange={onChange} />
						<div style={{display:'flex',gap:12}}>
							<Button type="submit" disabled={saving}>{saving ? 'Alterando...' : 'Altera'}</Button>
							<Button variant="secondary" type="button" onClick={handleCancel} disabled={saving}>Cancela</Button>
						</div>
					</form>
				</Card>
			</section>
		);
	}

	return null;
}

