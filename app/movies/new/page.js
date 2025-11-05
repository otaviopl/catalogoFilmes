'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createMovie } from '@/services/movies';
import Card from '@/components/ui/Card';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

export default function NewMoviePage() {
	const router = useRouter();
	const [form, setForm] = useState({ title: '', genre: '', year: '' });
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
			<Card style={{maxWidth: 560}}>
				<form onSubmit={onSubmit} style={{display:'grid',gap:12}}>
					<InputField label="Título" name="title" value={form.title} onChange={onChange} required />
					<InputField label="Gênero" name="genre" value={form.genre} onChange={onChange} />
					<InputField label="Ano" type="number" name="year" value={form.year} onChange={onChange} />
					<div style={{display:'flex',gap:12}}>
						<Button type="submit" disabled={saving}>{saving ? 'Criando...' : 'Criar'}</Button>
						<Link href="/"><Button variant="secondary" type="button">Cancelar</Button></Link>
					</div>
				</form>
			</Card>
		</section>
	);
}


