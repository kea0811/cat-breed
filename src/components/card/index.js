import React from 'react';

import CatBreedImage from '../catBreedImage';
import './card.css';

const Card = ({ name, image, weight, life_span }) => {
	return (
		<div className='cardWrapper'>
			<div className='nameWrapper'>
				<div>{name}</div>
			</div>
			<div className='imageWrapper'>
				<CatBreedImage
					placeholderImg='https://via.placeholder.com/400x200.png?text=Loading...'
					src={image?.url}
					alt='cat'
				/>
			</div>
			<div className='infoWrapper'>
				<div className='weightWrapper'>
					<div>Weight</div>
					<div className='weightValueWrapper'>
						<div>
							{weight?.imperial
								.split('-')
								.map(item => `${item.trim()}lbs`)
								.join(' - ')}
						</div>
						<div>
							{weight?.metric
								.split('-')
								.map(item => `${item.trim()}kg`)
								.join(' - ')}
						</div>
					</div>
				</div>
				<div className='lifeSpanWrapper'>
					<div>Life Span</div>
					<div>{life_span}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
