/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';

import debounce from 'lodash.debounce';

import './searchPanel.css';

const SearchPanel = ({ getData, getSearchData }) => {
	const [_query, setQuery] = useState('');

	const changeHandler = event => {
		const { value } = event?.target || {};
		setQuery(value);
		return getSearchData(value);
	};

	const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), []);

	return (
		<div className='searchPanelWrapper'>
			<input
				data-testid='searchInput'
				placeholder='Search your cat name'
				value={_query}
				onChange={event => {
					const { value } = event?.target || {};
					setQuery(value);
					if (value.length >= 3) {
						return debouncedChangeHandler(event);
					} else {
						if (value === '') {
							return getData();
						}
						return getSearchData(value);
					}
				}}
			/>
		</div>
	);
};

export default SearchPanel;
