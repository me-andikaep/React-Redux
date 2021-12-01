import './login.scss';
import { LoginHandler } from '../../services/authService';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
	const [dtLogin, setDtLogin] = useState({
		email: 'denata@gmail.com',
		password: '12345678',
		grant_type: 'password',
	});

	const authState = useSelector((state) => state?.auth);

	const dispatch = useDispatch();

	let history = useHistory();

	const onSubmit = () => {
		let fd = new FormData();
		fd.append('username', dtLogin.email);
		fd.append('password', dtLogin.password);
		fd.append('grant_type', dtLogin.grant_type);

		LoginHandler(fd, dispatch)
			.then((res) => {
				console.log('res login', res);
				history.push('/dashboard');
			})
			.catch((err) => {
				console.log('ini err', err);
				alert(err);
			});
	};

	return (
		<div className='container-login container'>
			<div>
				<div className='form-group'>
					<label>Email</label>
					<input
						name='email'
						value={dtLogin.email}
						onChange={(e) => setDtLogin({ ...dtLogin, email: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label>password</label>
					<input
						name='password'
						value={dtLogin.password}
						onChange={(e) =>
							setDtLogin({ ...dtLogin, password: e.target.value })
						}
					/>
				</div>
				<button onClick={onSubmit} disabled={authState.loading}>
					Login
					{authState.loading && (
						<div className='spinner-border' role='status'>
							<span className='sr-only'></span>
						</div>
					)}
				</button>
			</div>
		</div>
	);
};

export default Login;
