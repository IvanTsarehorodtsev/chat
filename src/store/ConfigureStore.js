import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {reducer} from './reducers/reducers'


const rootReducer = combineReducers({
    chat: reducer
});

// let composeEnhancers = compose;

// if(__DEV__) {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

export const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};
