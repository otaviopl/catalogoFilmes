'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovie, updateMovie } from '@/services/movies';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

export default function EditMoviePage() {
	const router = useRouter();
	const params = useParams();
	const id = params?.id;
	const [form, setForm] = useState({ title: '', genre: '', year: '' });
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
					year: String(data.year ?? '')
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
			<Card style={{maxWidth: 560}}>
				<form onSubmit={onSubmit} style={{display:'grid',gap:12}}>
					<InputField label="Título" name="title" value={form.title} onChange={onChange} required />
					<InputField label="Gênero" name="genre" value={form.genre} onChange={onChange} />
					<InputField label="Ano" type="number" name="year" value={form.year} onChange={onChange} />
					<div style={{display:'flex',gap:12}}>
						<Button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
						<Link href="/"><Button variant="secondary" type="button">Cancelar</Button></Link>
					</div>
				</form>
			</Card>
		</section>
	);
}


