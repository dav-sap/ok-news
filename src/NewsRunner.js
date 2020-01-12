import React, {useEffect, useState, useCallback, useRef} from 'react';
import './news-runner.css';
import axios from 'axios';

const NewsItem = ({title, desc, link, publication_date}) => {
	const goToLink = useCallback(() => {
		window.open(link, '_blank');
	}, [link]);
	return (
		<div className="news-item" onClick={goToLink}>{title}</div>
	)
};

const NewsRunner = () => {
	const [news, setNews] = useState([]);
	const [scrollStartPos, setScrollStartPos] = useState(0);
	const [scrollEnd, setScrollEnd] = useState(false);
	const [scrollSpeed, setScrollSpeed] = useState(20);
	const runnerNewsRef = useRef(null);
	useEffect(() => {
		const getMakoNews = async () => {
			try {
				const res = await axios.get('/mako_test');
				console.log(res.data);
				setNews(res.data)
			} catch (e) {
				console.error(e);
			}
		};
		getMakoNews();
	}, []);
	useEffect(() => {
		if (runnerNewsRef && runnerNewsRef.current) {
			setScrollStartPos(runnerNewsRef.current.scrollLeft);
		}
	}, [runnerNewsRef, runnerNewsRef.current]);

	useEffect(() => {
		let interval;
		const doInterval = () => {
			interval = setInterval(() => {
				runnerNewsRef.current.scrollTo({
					left: runnerNewsRef.current.scrollLeft - scrollSpeed,
					behavior: 'smooth'
				});
				if (runnerNewsRef.current.scrollLeft - scrollSpeed <= 0) {
					setScrollEnd(true);
				}
			}, 5);
		};
		if (runnerNewsRef && runnerNewsRef.current) {
			if (runnerNewsRef.current.scrollLeft - scrollSpeed >= 0) {
				doInterval();
			}
		}
		return () => clearInterval(interval)
	}, [runnerNewsRef, scrollSpeed, runnerNewsRef.current]);

	useEffect(() => {
		if (scrollEnd) {
			runnerNewsRef.current.scrollTo({
				left: scrollStartPos,
				behavior: 'smooth'
			});
		}
	}, [scrollEnd, runnerNewsRef.current]);
	return (
		<div className="news-page">
			<div className="news-runner">
				<div  className="news-runner-container">
					<div ref={runnerNewsRef} className="runner-wrapper">
						{news.map((newsItem, index) => (
							<NewsItem key={index} {...newsItem} />
						))}
					</div>
				</div>
			</div>
			<div className="speed-settings">

				מהירות
				<span className={`speed-option ${scrollSpeed === 160 ? 'selected' : ''}`} onClick={() => setScrollSpeed(160)}>8X</span>
				<span className={`speed-option ${scrollSpeed === 80 ? 'selected' : ''}`} onClick={() => setScrollSpeed(80)}>4X</span>
				<span className={`speed-option ${scrollSpeed === 40 ? 'selected' : ''}`} onClick={() => setScrollSpeed(40)}>2X</span>
				<span className={`speed-option ${scrollSpeed === 20 ? 'selected' : ''}`} onClick={() => setScrollSpeed(20)}>1X</span>
			</div>
		</div>
	)
}

export default NewsRunner;
