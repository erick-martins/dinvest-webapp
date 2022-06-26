import { store as defaultStore } from '@app/store';
import { ProvidersType, ProvidersComposer } from '@components/providers-composer';
import { AuthContext } from '@domains/auth/context';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const renderWithProviders = (ui: React.ReactElement, providers: ProvidersType[]) => {
	return render(ui, {
		wrapper: ({ children }) => (
			<ProvidersComposer providers={providers}>{children}</ProvidersComposer>
		)
	});
};

export const renderWithReduxAndProviders = (
	ui: React.ReactElement,
	store = defaultStore,
	providers: ProvidersType[] = []
) => {
	return renderWithProviders(ui, [[Provider, { store }], AuthContext, BrowserRouter, ...providers]);
};
