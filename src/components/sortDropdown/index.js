/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

import { IoChevronDownOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import _ from 'underscore';

import './sortDropdown.css';

const sortList = [
	{
		label: 'Name (Asc)',
		value: 'nameAsc',
	},
	{
		label: 'Name (Desc)',
		value: 'nameDesc',
	},
	{
		label: 'Weight (Asc)',
		value: 'weightAsc',
	},
	{
		label: 'Weight (Desc)',
		value: 'weightDesc',
	},
	{
		label: 'Lifespan (Asc)',
		value: 'lifeSpanAsc',
	},
	{
		label: 'Lifespan (Desc)',
		value: 'lifeSpanDesc',
	},
];

const chevronVariant = {
	expand: {
		rotate: 0,
	},
	collapse: {
		rotate: 180,
	},
};

const SortDropdown = ({ setData, data }) => {
	const [_selectedDropdown, setSelectedDropdown] = useState(sortList[0]);
	const [_showDropdown, setShowDropdown] = useState(false);
	const optionWrapperRef = useRef();

	const sortData = value => {
		switch (value) {
			case 'nameAsc':
				return setData(_.sortBy(data, 'name'));

			case 'nameDesc':
				return setData(_.sortBy(data, 'name').reverse());

			case 'weightAsc':
				return setData(
					_.sortBy(data, value => {
						return value['weight'].metric;
					})
				);

			case 'weightDesc':
				return setData(
					_.sortBy(data, value => {
						return value['weight'].metric;
					}).reverse()
				);

			case 'lifeSpanAsc':
				return setData(_.sortBy(data, 'life_span'));

			case 'lifeSpanDesc':
				return setData(_.sortBy(data, 'life_span').reverse());

			default:
				return setData(data);
		}
	};

	useEffect(() => {
		window.addEventListener('click', e => {
			if (e.target === optionWrapperRef.current && !_showDropdown) {
				return setShowDropdown(true);
			}
			return setShowDropdown(false);
		});
		return () => {
			window.removeEventListener('click', e => {
				if (e.target === optionWrapperRef.current && !_showDropdown) {
					return setShowDropdown(true);
				}
				return setShowDropdown(false);
			});
		};
	}, [_showDropdown]);

	return (
		<div className='sortDropdownWrapper'>
			<div
				className='selectedWrapper'
				ref={optionWrapperRef}
				data-testid='selectedDropdown'
			>
				{_selectedDropdown?.label}
				<motion.div
					variants={chevronVariant}
					initial='expand'
					animate={!_showDropdown ? 'collapse' : 'expand'}
					transition={{
						type: 'spring',
						bounce: 0,
						duration: 0.4,
					}}
					className='iconWrapper'
				>
					<IoChevronDownOutline size={19} />
				</motion.div>
			</div>
			{_showDropdown && (
				<div className='optionWrapper' data-testid='dropdownList'>
					{sortList.map(item => (
						<div
							data-testid={item.value}
							className='option'
							onClick={() => {
								setSelectedDropdown(item);
								setShowDropdown(false);
								sortData(item.value);
							}}
						>
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
