import select from 'select-dom';
import elementReady from 'element-ready';
import domLoaded from 'dom-loaded';

let ratingSources = {
	"Internet Movie Database": (rating, parent) => {
		return {
			id: "imdb",
			score: rating.Value.split('/')[0].replace('.', ''), // E.g. 0.0/10
			originalRating: rating.Value,
			link: 'http://imdb.com/title/' + parent.imdbID
		}
	},
  "Rotten Tomatoes": (rating, parent) => {
		return {
			id: "rt",
			score: rating.Value.substring(0, rating.Value.length - 1), // 00%
			originalRating: rating.Value
		}
	},
  "Metacritic": (rating, parent) => {
		return {
			id: "meta",
			score: rating.Value.split('/')[0], // E.g. 00/100
			originalRating: rating.Value
		}
	}
};

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

export function getRatingAsScore() {
	
}

export function getRaterUtils(rating, parent) {
	let ratingHandler = ratingSources[rating.Source];
	return ratingHandler ? ratingSources[rating.Source](rating, parent) : null;
}