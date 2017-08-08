import select from 'select-dom';
import elementReady from 'element-ready';
import domLoaded from 'dom-loaded';

/**
 * Automatically stops checking for an element to appear once the DOM is ready.
 */
export const safeElementReady = selector => {
	const waiting = elementReady(selector);
	domLoaded.then(() => requestAnimationFrame(() => waiting.cancel()));
	return waiting;
};

export const observeEl = (el, listener, options = {childList: true}) => {
	if (typeof el === 'string') {
		el = select(el);
	}

	// Run first
	listener([]);

	// Run on updates
	return new MutationObserver(listener).observe(el, options);
};
