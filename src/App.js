import React, {useState} from 'react';
import NewsRunner from './NewsRunner/NewsRunner';
import './App.scss';
import './fonts/fonts.css';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const App = () => {
	const [settingsView, setSettingsView] = useState('news');
	return (
		<div className="news-page">
			<AppHeader />
			<NewsRunner settingsView={settingsView} />
			<AppFooter settingsView={settingsView} setSettingsView={setSettingsView} />
		</div>
	);
};

export default App;
