/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import { Card, SearchPanel, SortDropdown } from '../../components';
import apiService from '../../library/apiService';
import { useOnScreen } from '../../hooks/useOnScreen';

import './content.css';

const Content = () => {
	const PAGE_SIZE = 12;
	const ref = useRef();
	const isVisible = useOnScreen(ref);

	const [_data, setData] = useState([]);
	const [_currentPage, setCurrentPage] = useState(1);
	const [_lastPage, setLastPage] = useState(1);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const data = await apiService.get('/breeds', undefined, {
			'x-api-key': process.env.REACT_APP_API_KEY,
		});

		setData(data?.data || []);
		setLastPage(Math.ceil(data?.data.length / PAGE_SIZE));
	};

	const getSearchData = async searchText => {
		const data = await apiService.get(`/breeds/search`, `q=${searchText}`, {
			'x-api-key': process.env.REACT_APP_API_KEY,
		});

		setData(data?.data || []);
		setLastPage(Math.ceil(data?.data.length / PAGE_SIZE));
	};

	useEffect(() => {
		if (isVisible && _data.length > 0) {
			setCurrentPage(_currentPage + 1);
		}
	}, [isVisible, _data]);

	return (
		<div className='contentWrapper'>
			<div className='selectionWrapper'>
				<SearchPanel getSearchData={getSearchData} getData={getData} />
				<SortDropdown setData={setData} data={_data} />
			</div>
			<div className='resultWrapper'>
				{_data.slice(0, _currentPage * PAGE_SIZE).map(item => (
					<Card key={item.name} {...item} />
				))}
			</div>
			<div
				className={`loadingWrapper ${
					_currentPage === _lastPage ? 'hidden' : ''
				}`}
				ref={ref}
			>
				LOADING...
			</div>
			{_lastPage && (
				<div className='bottomResultWrapper'>
					Looks like you've reached the end
				</div>
			)}
		</div>
	);
};

export default Content;
