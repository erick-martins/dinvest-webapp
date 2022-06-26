import { renderWithReduxAndProviders } from '@app/utils/testing.utils';
import { screen } from '@testing-library/react';
import { App } from '../app';

test('renders learn react link', () => {
	renderWithReduxAndProviders(<App />);
	const linkElement = screen.getByText(/loading/i);
	expect(linkElement).toBeInTheDocument();
});
