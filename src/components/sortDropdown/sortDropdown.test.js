import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import SortDropdown from './index';

let _data = [];

beforeEach(() => {
	const setData = jest.fn();
	const useStateMock = () => [_data, setData];
	jest.spyOn(React, 'useState').mockImplementation(useStateMock);
	setData([]);

	_data = [
		{
			name: 'Turkish Van',
			weight: {
				metric: '3 - 9',
				imperial: '7 - 20',
			},
			life_span: '12 - 17',
		},
		{
			name: 'York Chocolate',
			weight: {
				metric: '5 - 8',
				imperial: '12 - 18',
			},
			life_span: '13 - 15',
		},
	];
});

test('renders sort drop down onClick', () => {
	const setData = jest.fn();

	render(<SortDropdown data={[]} setData={setData} />);
	const selectedElem = screen.getByTestId('selectedDropdown');
	fireEvent(
		selectedElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);

	const dropdownListElem = screen.getByTestId('dropdownList');
	expect(dropdownListElem).toBeInTheDocument();
});

test('filter data by name descending', () => {
	const setData = jest.fn();

	render(<SortDropdown data={_data} setData={setData} />);
	const selectedElem = screen.getByTestId('selectedDropdown');
	fireEvent(
		selectedElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);

	const dropdownListElem = screen.getByTestId('nameDesc');
	fireEvent(
		dropdownListElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);
	expect(setData).toBeCalledWith([
		{
			name: 'York Chocolate',
			weight: {
				metric: '5 - 8',
				imperial: '12 - 18',
			},
			life_span: '13 - 15',
		},
		{
			name: 'Turkish Van',
			weight: {
				metric: '3 - 9',
				imperial: '7 - 20',
			},
			life_span: '12 - 17',
		},
	]);
});

test('filter data by weight descending', () => {
	const setData = jest.fn();

	render(<SortDropdown data={_data} setData={setData} />);
	const selectedElem = screen.getByTestId('selectedDropdown');
	fireEvent(
		selectedElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);

	const dropdownListElem = screen.getByTestId('weightDesc');
	fireEvent(
		dropdownListElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);
	expect(setData).toBeCalledWith([
		{
			name: 'York Chocolate',
			weight: {
				metric: '5 - 8',
				imperial: '12 - 18',
			},
			life_span: '13 - 15',
		},
		{
			name: 'Turkish Van',
			weight: {
				metric: '3 - 9',
				imperial: '7 - 20',
			},
			life_span: '12 - 17',
		},
	]);
});

test('filter data by life span descending', () => {
	const setData = jest.fn();

	render(<SortDropdown data={_data} setData={setData} />);
	const selectedElem = screen.getByTestId('selectedDropdown');
	fireEvent(
		selectedElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);

	const dropdownListElem = screen.getByTestId('lifeSpanDesc');
	fireEvent(
		dropdownListElem,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);
	expect(setData).toBeCalledWith([
		{
			name: 'York Chocolate',
			weight: {
				metric: '5 - 8',
				imperial: '12 - 18',
			},
			life_span: '13 - 15',
		},
		{
			name: 'Turkish Van',
			weight: {
				metric: '3 - 9',
				imperial: '7 - 20',
			},
			life_span: '12 - 17',
		},
	]);
});
