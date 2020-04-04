import React, {useMemo, useCallback} from 'react';
import './category-view.scss';

export const CATEGORIES = [
	{
		id: 'news',
		url: ['/mako?cat=news', '/ynet?cat=news'],
		label: 'כללי',
	},
	{
		id: 'sport',
		url: ['/mako?cat=sport', '/ynet?cat=sports'],
		label: 'ספורט',
	},
	{
		id: 'tarbut',
		url: ['/mako?cat=tarbut'],
		label: 'תרבות',
	},
	{
		id: 'fashion',
		url: ['/mako?cat=fashion'],
		label: 'אופנה',
	},
];

const CategoryButton = ({selectedCategories, selectCategory, category}) => {
	const isSelected = useMemo(() => selectedCategories.find((c) => c.id === category.id), [category, selectedCategories]);
	const onClick = useCallback(() => {
		selectCategory(category);
	}, [category]);
	return (
		<div className={`category-btn ${isSelected ? 'selected' : ''}`} onClick={onClick}>
			<span className="material-icons">{isSelected ? 'visibility' : 'visibility_off'}</span>
			{category.label}
		</div>
	);
};

const CategoriesView = ({selectCategory, selectedCategories}) => {

	return (
		<div className="categories-view">
			{CATEGORIES.map((cat) => (
				<CategoryButton key={cat.id} category={cat} selectCategory={selectCategory} selectedCategories={selectedCategories} />
			))}
		</div>
	);
};

export default CategoriesView;
