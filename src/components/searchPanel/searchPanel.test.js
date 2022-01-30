import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SearchPanel from './index';

beforeEach(() => {
	const setQuery = jest.fn();
	const useStateMock = _query => [_query, setQuery];
	jest.spyOn(React, 'useState').mockImplementation(useStateMock);
});

test('renders Search input with textbox', () => {
	const getSearchData = jest.fn();
	const getData = jest.fn();

	render(<SearchPanel getSearchData={getSearchData} getData={getData} />);

	const input = screen.getByTestId('searchInput');

	expect(input).toBeInTheDocument();
});

test('search query should call getData when input is empty string', () => {
	const getSearchData = jest.fn();
	const getData = jest.fn();

	render(<SearchPanel getSearchData={getSearchData} getData={getData} />);

	const input = screen.getByTestId('searchInput');
	fireEvent.change(input, { target: { value: 'si' } });
	fireEvent.change(input, { target: { value: '' } });

	expect(getData).toBeCalled();
});

test('renders Search input with value', () => {
	const getSearchData = jest.fn();
	const getData = jest.fn();

	render(<SearchPanel getSearchData={getSearchData} getData={getData} />);

	const input = screen.getByTestId('searchInput');
	fireEvent.change(input, { target: { value: 's' } });

	expect(getSearchData).toBeCalled();
});

test('search query should not call getSearchData at 100', () => {
	jest.useFakeTimers();

	const getSearchData = jest.fn();
	const getData = jest.fn();

	render(<SearchPanel getSearchData={getSearchData} getData={getData} />);

	const input = screen.getByTestId('searchInput');
	fireEvent.change(input, { target: { value: 'sibe' } });
	setTimeout(() => {
		expect(getSearchData).not.toBeCalled();
	}, 100);

	act(() => {
		jest.advanceTimersByTime(100);
	});

	jest.runAllTimers();
});

test('search query should call getSearchData at 1000', () => {
	jest.useFakeTimers();

	const getSearchData = jest.fn();
	const getData = jest.fn();

	render(<SearchPanel getSearchData={getSearchData} getData={getData} />);

	const input = screen.getByTestId('searchInput');
	fireEvent.change(input, { target: { value: 'sibe' } });
	setTimeout(() => {
		expect(getSearchData).toBeCalled();
	}, 1000);

	act(() => {
		jest.advanceTimersByTime(1000);
	});

	jest.runAllTimers();
});
