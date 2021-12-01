import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/index';
import thunk from 'redux-thunk';

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(...middleware))
);

// sagaMiddleware.run(rootSaga);

export default store;
