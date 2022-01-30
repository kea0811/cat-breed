import React, { useCallback, useEffect, useState } from 'react';

const CatBreedImage = ({ src, placeholderImg, ...props }) => {
	const [imgSrc, setSrc] = useState(placeholderImg || src);

	const onLoad = useCallback(() => {
		setSrc(src);
	}, [src]);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.addEventListener('load', onLoad);
		return () => {
			img.removeEventListener('load', onLoad);
		};
	}, [src, onLoad]);

	return <img data-testid='catProfile' {...props} alt={imgSrc} src={imgSrc} />;
};

export default CatBreedImage;
