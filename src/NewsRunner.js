import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import './news-runner.scss';
import { flatten, orderBy } from 'lodash';
import logo from './oknews.png';

const ORIGIN_TO_IMG = {
	ynet: 'https://m.ynet.co.il/content/images/icons/site/big_ynet_logo.png?v=20200317',
	mako: 'https://img.mako.co.il/2013/08/15/mako-logo_i.jpg',
};
const NewsItem = ({ title, link, source }) => {
	const itemRef = useRef({});
	const goToLink = useCallback(() => {
		window.open(link, '_blank');
	}, [link]);

	const onRemove = useCallback((e) => {
		e.stopPropagation();
		gsap.to(itemRef.current, 1, {ease: 'power1.inOut', opacity: 0, height: 0, scale: 0.6, marginBottom: 0, duration: 2});
	}, [itemRef]);
	return (
		<div className="news-item" ref={itemRef} onClick={goToLink}>
			<img className={`news-source-img ${source}`} src={ORIGIN_TO_IMG[source]} />
			<span className="text">{title}</span>
			<span className="material-icons" onClick={onRemove}>cancel</span>
		</div>
	);
};

const CATEGORIES = [
	{
		id: 'news',
		url: ['/mako_news', '/ynet_news'],
		label: 'כללי',
		news: [],
	},
	{
		id: 'sport',
		url: ['/mako_sport'],
		label: 'ספורט',
		news: [],
	},
	{
		id: 'tarbut',
		url: ['/mako_tarbut'],
		label: 'תרבות',
		news: [],
	},
];


const INITIAL_CAT = CATEGORIES[0];
const NewsRunner = () => {
	const [news, setNews] = useState([]);
	const [settingsView, setSettingsView] = useState('news');
	const [selectedCategories, setSelectedCategories] = useState([INITIAL_CAT]);
	const [newCategory, setNewCategory] = useState(INITIAL_CAT);
	const runnerNewsRef = useRef({});
	useEffect(() => {
		const getNews = async () => {
			try {
				const res = await Promise.all(newCategory.url.map((url) => axios.get(url)));
				const flattenResults = flatten(res.map((r) => r.data));
				setSelectedCategories((all) => {
					const changedCat = all.find((a) => a.id === newCategory.id);
					changedCat.news = flattenResults;
					return all.filter((a) => a.id !== newCategory.id).concat([changedCat]);
				});
			} catch (e) {
				console.error(e);
			}
		};
		getNews();
	}, [newCategory]);
	useEffect(() => {
		setNews(orderBy(flatten(selectedCategories.map((s) => s.news)), (n1) => new Date(n1.publication_date), ['desc']));
	}, [selectedCategories]);

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
	const changeSettingsView = useCallback((view) => {
		setSettingsView(view);
	}, []);

	// <div className="categories-container">
	// 	{CATEGORIES.map((cat) => (
	// 		<div key={cat.id} className={`category-btn ${selectedCategories.find((c) => c.id === cat.id) ? 'selected' : ''}`} onClick={() => selectCategory(cat)}>{cat.label}</div>
	// 	))}
	// </div>
	useEffect(() => {
		gsap.from('.news-item', 1, {ease: 'power1.inOut', opacity: 0, scale: 0.6, duration: 2, stagger: {each: 0.1, y: -100}});
	}, [news]);
	return (
		<div className="news-page">

			<img src={logo} className="logo" alt="logo" />
			<div className="desc">כל החדשות המעניינות והרלוונטיות מהאתרים המובילים בישראל. </div>
			<div className="news-runner">
				<div className="news-runner-container">
					<div ref={runnerNewsRef} className="runner-wrapper">
						{news.map((newsItem) => (
							<NewsItem key={newsItem.id || newsItem.link.slice(50)} {...newsItem} />
						))}
					</div>
				</div>
			</div>
			<div className="footer">
				<div className="footer-relative">
					<div className={`settings-button ${settingsView === 'news' ? 'selected' : ''}`} onClick={() => changeSettingsView('news')}>
						חדשות
					</div>
					<div className={`settings-button ${settingsView === 'filters' ? 'selected' : ''}`} onClick={() => changeSettingsView('filters')}>
						פילטר
					</div>
					<div className={`settings-button ${settingsView === 'contact' ? 'selected' : ''}`} onClick={() => changeSettingsView('contact')}>
						צור קשר
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsRunner;
