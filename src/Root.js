import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const Root = ({
    children,
    initialState,
    reducers,
}) => (
    <Provider
        store={configureStore(initialState, reducers)}
    >
        {children}
    </Provider>
)

export default Root