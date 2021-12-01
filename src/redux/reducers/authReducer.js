// export const START_LOGIN = 'START_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const LOADING_LOGIN = 'LOADING_LOGIN';

const initialState = {
	dtAuth: null,
	dtLogin: null,
	loading: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SUCCESS_LOGIN:
			return {
				...state,
				dtAuth: action.dtAuth,
				dtLogin: action.dtLogin,
				error: null,
			};
		case ERROR_LOGIN:
			return { ...state, dtAuth: null, error: action.error };
		case LOADING_LOGIN:
			return { ...state, loading: action.loading };
		default:
			return state;
	}
};
