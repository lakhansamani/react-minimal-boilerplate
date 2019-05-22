// __tests__/fetch.test.js
import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from './App';

test('displays app', async () => {
	const { getByText } = render(<App />);

	expect(getByText('Welcome to react app')).toBeInTheDocument();
});
