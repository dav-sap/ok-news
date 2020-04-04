import React from 'react';
import logo from './oknews.png';

const DAYS = {
	0: ' ראשון',
	1: ' שני',
	2: ' שלישי',
	3: ' רביעי',
	4: ' חמישי',
	5: ' שישי',
	6: ' שבת',
};
const AppHeader = () => {
	const now = new Date();
	return (
		<div className="app-header">
			<div className="date">
				יום
				{`${DAYS[now.getDay()]}`}
			</div>
			<img src={logo} className="logo" alt="logo" />
			<div className="desc">כל החדשות המעניינות והרלוונטיות מהאתרים המובילים בישראל.</div>
		</div>
	);
}

export default AppHeader;
