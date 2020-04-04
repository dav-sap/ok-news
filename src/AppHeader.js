import React from 'react';
import logo from './oknews.png';

const AppHeader = () => (
	<div className="app-header">
		<img src={logo} className="logo" alt="logo" />
		<div className="desc">כל החדשות המעניינות והרלוונטיות מהאתרים המובילים בישראל. </div>
	</div>
);

export default AppHeader;
