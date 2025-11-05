'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createMovie } from '@/services/movies';

export default function NewMoviePage() {
	const router = useRouter();
	const [form, setForm] = useState({ title: '', genre: '', year: '', director: '' });
	const [saving, setSaving] = useState(false);

	function onChange(e) {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		try {
			setSaving(true);
			await createMovie({
				...form,
				year: Number(form.year || 0)
			});
			router.push('/');
		} catch (err) {
			alert('Erro ao salvar. Verifique a API.');
		} finally {
			setSaving(false);
		}
	}

	return (
		<section>
			<h1 style={{margin:'8px 0 16px'}}>Novo filme</h1>
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
					<button type="submit" disabled={saving} style={{padding:'8px 12px'}}>{saving ? 'Criando...' : 'Criar'}</button>
					<Link href="/"><button type="button" style={{padding:'8px 12px'}}>Cancelar</button></Link>
				</div>
			</form>
		</section>
	);
}


