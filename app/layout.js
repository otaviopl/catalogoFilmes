import './globals.css';
import Link from 'next/link';

export const metadata = {
	title: 'PW2 Movies',
	description: 'CRUD de filmes usando MockAPI.io'
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR">
			<body>
				<header style={{borderBottom:'1px solid #e5e7eb'}}>
					<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:16}}>
						<h1 style={{margin:0,fontSize:20}}>Catálogo de Filmes</h1>
						<nav style={{display:'flex',gap:16}}>
							<Link href="/">Início</Link>
							<Link href="/movies/new">Criar</Link>
							<Link href="/">Alterar</Link>
							<Link href="/">Apagar</Link>
						</nav>
					</div>
				</header>
				<main style={{maxWidth:960,margin:'24px auto',padding:'0 16px'}}>{children}</main>
			</body>
		</html>
	);
}


