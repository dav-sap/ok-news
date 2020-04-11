import gsap from 'gsap';

const safeParsing = (str) => {
	try {
		return JSON.parse(str);
	} catch (e) {
		return null;
	}
};

const dismissEvent = (refs, event) => {
	refs.forEach((r) => {
		gsap.to(r.current, 1, {ease: 'power1.inOut', opacity: 0, height: 0, minHeight: 0, scale: 0.6, marginBottom: 0, duration: 1.3});
	});
	const dismissed = safeParsing(localStorage.getItem('dismissedNews')) || [];
	localStorage.setItem('dismissedNews', JSON.stringify(dismissed.concat([event])));
};

export {
	safeParsing,
	dismissEvent,
};
