import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/bootstrap.scss';
import './i18n/i18n';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '@domains/auth/context';
import { ProvidersComposer } from '@components/providers-composer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ProvidersComposer providers={[[Provider, { store }], AuthContext, BrowserRouter]}>
			<App />
		</ProvidersComposer>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
