import React from 'react';


const AppFooter = ({settingsView, setSettingsView}) => {

	return (
		<div className="footer">
			<div className="footer-relative">
				<div className={`settings-button ${settingsView === 'news' ? 'selected' : ''}`} onClick={() => setSettingsView('news')}>
					חדשות
				</div>
				<div className={`settings-button ${settingsView === 'filters' ? 'selected' : ''}`} onClick={() => setSettingsView('filters')}>
					סנן תוכן
				</div>
				<div className={`settings-button ${settingsView === 'contact' ? 'selected' : ''}`} onClick={() => setSettingsView('contact')}>
					צור קשר
				</div>
			</div>
		</div>
	)
}

export default AppFooter;
