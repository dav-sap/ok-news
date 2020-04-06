import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import './news-runner.scss';
import { flatten, orderBy } from 'lodash';
import NewsItem from './NewsItem/NewsItem';
import CategoriesView, {CATEGORIES} from './CategoriesView';

const NewsView = ({news}) => (
	news.map((newsItem) => (
		<NewsItem key={newsItem.id || newsItem.link.slice(50)} {...newsItem} />
	))
);

const NewsRunner = ({settingsView}) => {
	const [news, setNews] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([CATEGORIES[0]]);

	useEffect(() => {
		const getNews = async () => {
			try {
				const res = await Promise.all(flatten(selectedCategories.map((cat) => cat.url.map((url) => axios.get(url)))));
				const flattenResults = flatten(res.map((r) => r.data)).map(r => {
					const date = new Date(r.publication_date);
					return {...r, publication_date: date, dateTimestamp: date.getTime()};
				});
				console.log(flattenResults)
				setNews(orderBy(flattenResults, ['dateTimestamp'] , ['desc']));
			} catch (e) {
				console.error(e);
			}
		};
		if (settingsView === 'news') {
			getNews();
		}
	}, [settingsView, selectedCategories]);

	const selectCategory = useCallback((cat) => {
		setSelectedCategories((selectedCats) => {
			const existingCat = selectedCats.find((a) => a.id === cat.id);
			if (existingCat) {
				return selectedCats.filter((a) => a.id !== cat.id);
			}
			return selectedCats.concat(cat);
		});
	}, []);

	useEffect(() => {
		gsap.from('.news-item', {opacity: 0.6, scale: 0.8, duration: 0.7, ease: 'elastic.out(1, 0.85)', stagger: {each: 0.1, y: 30}});
	}, [news]);

	const view = useMemo(() => {
		switch (settingsView) {
		case 'news':
			return <NewsView news={news} />;
		case 'filters':
			return <CategoriesView selectedCategories={selectedCategories} selectCategory={selectCategory} />;
		default:
			return <NewsView news={news} />;
		}
	}, [settingsView, news, selectCategory, selectedCategories]);

	return (
		<div className="news-runner">
			<div className="news-runner-container">
				<div className="runner-wrapper">
					{view}
				</div>
			</div>
		</div>
	);
};

export default NewsRunner;
