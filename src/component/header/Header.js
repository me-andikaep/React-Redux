const Header = (props) => {
	const _onLogout = async () => {
		localStorage.removeItem('@token');
		localStorage.removeItem('@userAuth');
		await props.history.replace('/login');
	};
	return (
		<div>
			<button onClick={_onLogout}>Logout</button>
		</div>
	);
};

export default Header;
