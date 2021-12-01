import Login from './container/login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import DashboardLayout from './container/layout/DashboardLayout';
import Page404 from './page/errorPage/Page404';

function App() {
	const checkAuth = () => {
		const token = localStorage.getItem('@token');
		if (!token) {
			return false;
		}

		try {
			// { exp: 12903819203 }
			// const { exp } = decode(token);

			var decoded = decode(token);
			var exp = decoded.exp;
			var now = Date.now() / 1000;

			if (exp < now) {
				localStorage.clear();
				return false;
			}
		} catch (e) {
			return false;
		}

		return true;
	};

	const PrivateRoute = ({ component: Component, ...rest }) => (
		<Route
			{...rest}
			render={(props) =>
				checkAuth() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);

	return (
		<>
			<Switch>
				<Route path='/login' component={Login} />
				<PrivateRoute component={DashboardLayout} />
				<Route path='*' component={Page404} />
			</Switch>
		</>
	);
}

export default App;
