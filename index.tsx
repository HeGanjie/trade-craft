import 'bootstrap-webpack!./config/bootstrap.config.js';
import * as React from 'react';
import { render } from 'react-dom';
import Game from './src/components/game.tsx';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import Reducer from "./src/reducers.ts";

import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n.ts';

render(
    <Provider store={ createStore(Reducer, applyMiddleware(thunk)) }>
        <I18nextProvider i18n={ i18n }>
            <Game />
        </I18nextProvider>
    </Provider>,
    document.querySelector('.app')
);


