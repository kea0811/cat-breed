import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const mock = function () {
	return {
		observe: jest.fn(),
		disconnect: jest.fn(),
	};
};

window.IntersectionObserver = mock;

test('renders App with Cat Breed title', () => {
	render(<App />);
	const titleElem = screen.getByText(/Cat Breed/i);
	expect(titleElem).toBeInTheDocument();
});
