import React, {useCallback, useRef} from 'react';
import gsap from 'gsap';

const ORIGIN_TO_IMG = {
	ynet: 'https://m.ynet.co.il/content/images/icons/site/big_ynet_logo.png?v=20200317',
	mako: 'https://img.mako.co.il/2013/08/15/mako-logo_i.jpg',
	walla: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAMAAAAvHNATAAAAZlBMVEUAmf////8Yk9YJmu1MgqUBmvwImu8CmvoSlt6Fj6EPmOIEm/Zhgp0tib69vMUOmOQijspUgaCOlaXr6u3W1Nnl4+dCgqwnjMTx8PA3hrXNyc/5+Plpg5x3iZ6nqbMVldmanqtFgqnuttmDAAACKklEQVR4nO2cWU4CURQFW6BpRhlERhHY/ybF4H8XHxavk1MrqEA8705YVSGEEEIIIfwz034rwxdoTb7eAOe+7dUjWncGstfwE4rNZLED9Hqby2JrKrZwvYbU6712xZZUbOt6VQMq1nO96iMVm7piC+r15XpVcyq2k8XQa/SL/CBNqde361VdqJgdFlsqdpHFvqHXvnG9+vQDW7le/D1aymIrKiaHRUNrxKvrVY3oB3aQxXDxOpLFaPH6WWpY2P1R98NC7sKbD+g1dr14WNgNJQ6LiSx2hV4buaHsfljIDWX3w+LseiUsnoaGxTFh8SBh8SQJi2cpNizozKLYsLi5XtWOitlhMaNiclhMT9DLDgu6CNTDAg845b1W/Q697LDA2xC7ssDbEHtmcaZicljg1ena9eJhYQ848epUHnDWG+hlb0Mm9AOz7yyKXZ2OqVjuLB7ghtIuXnFDKReveK9lv0fFVhZU7Kqf/qEH6TR4wUli/9JrYyLf8YQQQgihjWbR/oIv5Fr/Tj1Hve5aL3louW8POIudvOJOV17T4E7Xnrzib9LudG9UzF7T0Bn6Se5E8MLNHot1/+6v1CNhe4aOJ6/2DB1PXu0jYfoe2UfC+D3KLwr+wGsauUjEa5qExR+dD4uPUn9RUGxlYS/ccGUhL9yaPfSyF27FtiH4lEd+j/ApT7ELN/s9wrFvzyxu0Otqr7bgH+VY/w8g1Wg7aOVw8QeJIYQQQgghFMEPWsgfHu9VhuEAAAAASUVORK5CYII='
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
			<button className="material-icons" onClick={onRemove}>cancel</button>
		</div>
	);
};

export default NewsItem;
