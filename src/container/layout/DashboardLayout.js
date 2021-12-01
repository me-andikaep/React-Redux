import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../component/header/Header';
import routes from '../../config/routes';

const DashboardLayout = (props) => {
	console.log('props', props);
	console.log('location', props.location.pathname);

	const getRoutes = (routeList) => {
		console.log('routeList', routeList);
		return routeList.map((prop, key) => {
			console.log('prop', prop);
			console.log('path', prop.path);
			return (
				<Route
					path={prop.path}
					component={prop.component}
					key={key}
					exact={prop.isExact}
					// layout={prop.layout}
					// role={prop.role}
				/>
			);
		});
	};

	return (
		<div>
			<Header {...props} />
			tesssss
			<Suspense fallback={<span>Loading</span>}>
				<Switch>{getRoutes(routes)}</Switch>
			</Suspense>
		</div>
	);
};

export default DashboardLayout;
