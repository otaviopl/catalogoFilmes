export default function Button({ children, variant = 'primary', type = 'button', disabled, onClick, style }) {
	const className = ['btn', variant === 'secondary' ? 'btn-secondary' : '', variant === 'danger' ? 'btn-danger' : '']
		.filter(Boolean)
		.join(' ');
	return (
		<button type={type} disabled={disabled} onClick={onClick} className={className} style={style}>
			{children}
		</button>
	);
}


