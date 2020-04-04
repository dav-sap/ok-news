import React, {useCallback, useRef} from 'react';
import gsap from 'gsap';

const ORIGIN_TO_IMG = {
	ynet: 'https://m.ynet.co.il/content/images/icons/site/big_ynet_logo.png?v=20200317',
	mako: 'https://img.mako.co.il/2013/08/15/mako-logo_i.jpg',
};
const NewsItem = ({ title, link, source }) => {
	const itemRef = useRef({});
	const imgRef = useRef({});

	const goToLink = useCallback(() => {
		window.open(link, '_blank');
	}, [link]);

	const onRemove = useCallback((e) => {
		e.stopPropagation();
		gsap.to(imgRef.current, 1, {ease: 'power1.inOut', opacity: 0, height: 0, scale: 0.6, marginBottom: 0, duration: 2});
		gsap.to(itemRef.current, 1, {ease: 'power1.inOut', opacity: 0, height: 0, scale: 0.6, marginBottom: 0, duration: 2});
	}, [itemRef]);
	return (
		<div className="news-item" ref={itemRef} onClick={goToLink}>
			<img className={`news-source-img ${source}`} ref={imgRef} src={ORIGIN_TO_IMG[source]} alt={source} />
			<span className="text">{title}</span>
			<span className="material-icons" onClick={onRemove}>cancel</span>
		</div>
	);
};

export default NewsItem;
