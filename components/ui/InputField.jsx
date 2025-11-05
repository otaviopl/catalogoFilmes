export default function InputField({ label, name, value, onChange, type = 'text', required }) {
	return (
		<label style={{display:'grid', gap:6}}>
			<div style={{fontSize:14, color:'#374151'}}>{label}</div>
			<input name={name} value={value} onChange={onChange} type={type} required={required} />
		</label>
	);
}


