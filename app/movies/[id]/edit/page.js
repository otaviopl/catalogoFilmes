'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovie, updateMovie } from '@/services/movies';

export default function EditMoviePage() {
	const router = useRouter();
	const params = useParams();
	const id = params?.id;
	const [form, setForm] = useState({ title: '', genre: '', year: '', director: '' });
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) return;
		(async () => {
			try {
				setLoading(true);
				const data = await getMovie(id);
				setForm({
					title: data.title || '',
					genre: data.genre || '',
					year: String(data.year ?? ''),
					director: data.director || ''
				});
			} catch (e) {
				setError('Falha ao carregar filme.');
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	function onChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		try {
			setSaving(true);
			await updateMovie(id, { ...form, year: Number(form.year || 0) });
			router.push(`/movies/${id}`);
		} catch (err) {
			alert('Erro ao salvar alterações.');
		} finally {
			setSaving(false);
		}
	}

	if (loading) return <p>Carregando...</p>;
	if (error) return <p style={{color:'crimson'}}>{error}</p>;

	return (
		<section>
			<h1 style={{margin:'8px 0 16px'}}>Editar filme</h1>
			<form onSubmit={onSubmit} style={{display:'grid',gap:12,maxWidth:520}}>
				<label>
					<div>Título</div>
					<input name="title" value={form.title} onChange={onChange} required style={{width:'100%',padding:8,border:'1px solid #d1d5db',borderRadius:6}} />
				</label>
				<label>
					<div>Gênero</div>
					<input name="genre" value={form.genre} onChange={onChange} style={{width:'100%',padding:8,border:'1px solid #d1d5db',borderRadius:6}} />
				</label>
				<label>
					<div>Ano</div>
					<input type="number" name="year" value={form.year} onChange={onChange} style={{width:'100%',padding:8,border:'1px solid #d1d5db',borderRadius:6}} />
				</label>
				<label>
					<div>Diretor</div>
					<input name="director" value={form.director} onChange={onChange} style={{width:'100%',padding:8,border:'1px solid #d1d5db',borderRadius:6}} />
				</label>
				<div style={{display:'flex',gap:12}}>
					<button type="submit" disabled={saving} style={{padding:'8px 12px'}}>{saving ? 'Salvando...' : 'Salvar'}</button>
				</div>
			</form>
		</section>
	);
}


