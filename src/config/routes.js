import { lazy } from 'react';

const routes = [
	{
		path: '/dashboard',
		component: lazy(() => import('../page/dashboard/Dashboard')),
		isExact: true,
	},
	{
		path: '/order',
		component: lazy(() => import('../page/order/Order')),
		isExact: true,
	},
	{
		path: '*',
		component: lazy(() => import('../page/errorPage/Page404')),
		isExact: true,
	},
];

export default routes;
