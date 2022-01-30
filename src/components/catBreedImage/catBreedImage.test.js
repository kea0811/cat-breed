import React from 'react';
import { render, screen } from '@testing-library/react';
import CatBreedImage from './index';

test('renders Card with big image', () => {
	render(
		<CatBreedImage
			placeholderImg='https://via.placeholder.com/400x200.png?text=Loading...'
			src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg'
		/>
	);

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
