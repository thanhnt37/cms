import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

import sagaMiddleware, { rootSaga } from './middlewares/index';
import reduxLogger from './middlewares/reduxLogger';

export default (props) => {

    const initialState = {};

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(
            sagaMiddleware,
            reduxLogger
        )
    );

    sagaMiddleware.run(rootSaga);

    /**
     * Persist the state on page refresh or when browser is closed
     */
    window.onbeforeunload = () => {

    };

    window.onload = () => {

    };

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
};