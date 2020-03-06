import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import './news-runner.css';
import { flatten, orderBy } from 'lodash';
import logo from './oknews.png';

const NewsItem = ({ title, link }) => {
	const goToLink = useCallback(() => {
		window.open(link, '_blank');
	}, [link]);
	return (
		<div className="news-item" onClick={goToLink}>{title}</div>
	);
};
const CATEGORIES = [
	{
		id: 'news',
		url: '/mako_news',
		label: 'כללי',
		news: [],
	},
	{
		id: 'sport',
		url: '/mako_sport',
		label: 'ספורט',
		news: [],
	},
	{
		id: 'tarbut',
		url: '/mako_tarbut',
		label: 'תרבות',
		news: [],
	},
];

const SPEEDS = [
	4,
	6,
	8,
	10,
];

const INITIAL_CAT = CATEGORIES[0];
const NewsRunner = () => {
	const [news, setNews] = useState([]);
	const [scrollStartPos, setScrollStartPos] = useState(0);
	const [scrollEnd, setScrollEnd] = useState(false);
	const [settingsView, setSettingsView] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([INITIAL_CAT]);
	const [newCategory, setNewCategory] = useState(INITIAL_CAT);
	const [scrollSpeed, setScrollSpeed] = useState(SPEEDS[0]);
	const runnerNewsRef = useRef({});
	useEffect(() => {
		const getMakoNews = async () => {
			try {
				const res = await axios.get(newCategory.url);
				setSelectedCategories((all) => {
					const changedCat = all.find((a) => a.id === newCategory.id);
					changedCat.news = res.data;
					return all.filter((a) => a.id !== newCategory.id).concat([changedCat]);
				});
			} catch (e) {
				console.error(e);
			}
		};
		getMakoNews();
	}, [newCategory]);
	useEffect(() => {
		if (runnerNewsRef && runnerNewsRef.current) {
			setScrollStartPos(runnerNewsRef.current.scrollLeft);
		}
	}, [runnerNewsRef, runnerNewsRef.current]);

	useEffect(() => {
		setNews(orderBy(flatten(selectedCategories.map((s) => s.news)), (n1) => new Date(n1.publication_date), ['desc']));
	}, [selectedCategories]);

	useEffect(() => {
		let interval;
		const doInterval = () => {
			interval = setInterval(() => {
				runnerNewsRef.current.scrollTo({
					left: runnerNewsRef.current.scrollLeft - (scrollSpeed),
					behavior: 'smooth',
				});
				if (runnerNewsRef.current.scrollLeft - (scrollSpeed) <= 0) {
					setScrollEnd(true);
				}
			}, 30);
		};
		doInterval()();
		return () => clearInterval(interval);
	}, [runnerNewsRef, scrollSpeed, runnerNewsRef.current, settingsView]);

	useEffect(() => {
		if (scrollEnd) {
			runnerNewsRef.current.scrollTo({
				left: scrollStartPos,
				behavior: 'smooth',
			});
		}
	}, [scrollEnd, runnerNewsRef.current]);

	const selectCategory = useCallback((cat) => {
		setSelectedCategories((selectedCats) => {
			const existingCat = selectedCats.find((a) => a.id === cat.id);
			if (existingCat) {
				return selectedCats.filter((a) => a.id !== cat.id);
			}
			setNewCategory(cat);
			return selectedCats.concat(cat);
		});
	}, []);
	const changeSettingsView = useCallback(() => {
		setSettingsView((s) => !s);
	}, []);

	return (
		<div className="news-page">
			<div className="center-container">
				<img src={logo} className="logo" alt="logo" />
				<div className="desc">כל החדשות המעניינות והרלוונטיות מהאתרים המובילים בישראל. </div>
				<div className="news-runner">
					<div className="news-runner-container">
						<div ref={runnerNewsRef} className="runner-wrapper">
							{settingsView ? (
								<div className="categories-container">
									{CATEGORIES.map((cat) => (
										<div key={cat.id} className={`category-btn ${selectedCategories.find((c) => c.id === cat.id) ? 'selected' : ''}`} onClick={() => selectCategory(cat)}>{cat.label}</div>
									))}
								</div>
							) : (
								news.map((newsItem) => (
									<NewsItem key={newsItem.publication_date} title={newsItem.title} link={newsItem.link} />
								))
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="speed-settings">

				מהירות
				<span className={`speed-option ${scrollSpeed === SPEEDS[3] ? 'selected' : ''}`} onClick={() => setScrollSpeed(SPEEDS[3])}>8X</span>
				<span className={`speed-option ${scrollSpeed === SPEEDS[2] ? 'selected' : ''}`} onClick={() => setScrollSpeed(SPEEDS[2])}>4X</span>
				<span className={`speed-option ${scrollSpeed === SPEEDS[1] ? 'selected' : ''}`} onClick={() => setScrollSpeed(SPEEDS[1])}>2X</span>
				<span className={`speed-option ${scrollSpeed === SPEEDS[0] ? 'selected' : ''}`} onClick={() => setScrollSpeed(SPEEDS[0])}>1X</span>
			</div>
			<div className="footer">
				<div className="footer-relative">
					<div className="settings-button" onClick={changeSettingsView}>
						הגדרות
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsRunner;
