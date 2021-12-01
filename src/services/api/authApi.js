import axios from 'axios';
import base64 from 'base-64';

const authHeader =
	'Basic ' +
	base64.encode(
		`${process.env.REACT_APP_BASIC_AUTH_USERNAME}:${process.env.REACT_APP_BASIC_AUTH_PASS}`
	);
export default axios.create({
	baseURL: `${process.env.REACT_APP_AUTH_SERVICE}`,
	headers: {
		authorization: authHeader,
		Accept: 'application/json',
	},
});
