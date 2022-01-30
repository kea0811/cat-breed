import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './index';

test('renders Card with Test Name', () => {
	const mockData = {
		name: 'Test Name',
		weight: {
			imperial: '2 - 6',
			metric: '1 - 3',
		},
	};
	render(<Card {...mockData} />);

	const kgElem = screen.getByText(/1kg - 3kg/i);
	const lbsElem = screen.getByText(/2lbs - 6lbs/i);
	const titleElem = screen.getByText(/Test Name/i);

	expect(titleElem).toBeInTheDocument();
	expect(kgElem).toBeInTheDocument();
	expect(lbsElem).toBeInTheDocument();
});

test('renders Card with big image', () => {
	const mockData = {
		name: 'Test Name',
		image: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg',
		},
	};
	render(<Card {...mockData} />);

	const image = screen.getByTestId('catProfile');
	expect(image).toHaveAttribute(
		'src',
		'https://via.placeholder.com/400x200.png?text=Loading...'
	);

	setTimeout(() => {
		expect(image).toHaveAttribute(
			'src',
			'https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg'
		);
	}, 5000);
});
