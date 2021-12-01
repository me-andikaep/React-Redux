// import axios from 'axios';
import { HandlerAPI } from './api/HandlerApi';
import AuthApi from './api/authApi';
import {
	LOADING_LOGIN,
	SUCCESS_LOGIN,
	ERROR_LOGIN,
} from '../redux/reducers/authReducer';

export const LoginHandler = async (auth, dispatch) => {
	dispatch({ type: LOADING_LOGIN, loading: true });
	try {
		const response = await AuthApi.post('/user/v1/signin', auth);
		console.log('response login sukses', response.data);
		if (response) {
			let Token = response?.data?.access_token;

			try {
				const resAuth = await HandlerAPI(
					`${process.env.REACT_APP_AUTH_SERVICE}/oauth/check_token`,
					'get',
					{ token: Token }
				);

				if (resAuth) {
					// console.log('response Check auth', resAuth.data);

					localStorage.setItem('@token', Token);
					localStorage.setItem('@userAuth', resAuth.data);

					dispatch({
						type: SUCCESS_LOGIN,
						dtAuth: resAuth.data,
						dtLogin: response.data,
					});
					dispatch({ type: LOADING_LOGIN, loading: false });
					return Promise.resolve(resAuth.data);
				}
			} catch (err) {
				const errrAuth = JSON.parse(err?.request?.response);
				// console.log('errrAuth', err);
				dispatch({
					type: ERROR_LOGIN,
					error: errrAuth,
				});
				dispatch({ type: LOADING_LOGIN, loading: false });
				return Promise.reject(err);
			}
		}
	} catch (error) {
		// console.log('errrrr 1', error.request.response);
		dispatch({
			type: ERROR_LOGIN,
			error: JSON.parse(error?.request?.response),
		});
		dispatch({ type: LOADING_LOGIN, loading: false });
		return Promise.reject(JSON.parse(error?.request?.response));
	}
};
