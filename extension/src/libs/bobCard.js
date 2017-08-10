import * as icons from './icons';
import { h } from 'dom-chef'; // JSX vDOM
import { getRaterUtils } from './utils';


export function enhanceBobCard(details, node) {
	let enhanceDom;

	if(details.Error !== "") {
		// TODO: Impove Go API to return null on no error
		// TODO: Icon for failure/unknown
		//.Error Will contain the phrase "not found"
		return; // TODO: Show error box?
	} else {
		enhanceDom = details.Ratings.map(rating => {
			let parsedRating = getRaterUtils(rating, details);
			
			// Don't know this rater
			if(!parsedRating) return;

			return (
				<div class="nf-svg-button-wrapper">
					{ parsedRating.link ? (
						<a href={parsedRating.link} target="_blank" class={"nf-svg-button simpleround npp-icon-" + parsedRating.id }>
							<span>{ parsedRating.score }</span>
						</a>
					) : (
						<a class={"nf-svg-button simpleround npp-icon-" + parsedRating.id }>
							<span>{ parsedRating.score }</span>
						</a>
					)}
				</div>
			); 
		})
	}
	/*
	  let newNode = document.createElement('span')
		newNode.innerHTML = 'Loading Ratings'
		newNode.style = ''
	 */
	let buttonWrapper = node.querySelector('.bob-last-content .bob-button-wrapper');
	if(buttonWrapper && buttonWrapper.firstChild) {
		buttonWrapper.insertBefore(<div>{ enhanceDom }</div>, buttonWrapper.firstChild);
	}
};

export function parseBobCard(node) {
	let parsed = {
		title: null,
		type: null,
		year: null
	};

	// TODO: Refactor this

	let titleNodeQ = node.getElementsByClassName('bob-title');
	let yearNodeQ = node.getElementsByClassName('year');
	let durationNodeQ = node.getElementsByClassName('duration');
	let watchedNodeQ = node.getElementsByClassName('watched-title');

	if(titleNodeQ.length > 0 && titleNodeQ[0].textContent) {
		parsed.title = titleNodeQ[0].textContent;
	}
	
	if(yearNodeQ.length > 0 && yearNodeQ[0].textContent) {
		parsed.year = yearNodeQ[0].textContent;
	}

	// This block is for part way through series that show watched position E.g. S2:E1
	let episodePatternRegEx = new RegExp(/^S(\d+):E/);
	// Test is showing episode (we'll lookup ratings for series anyway)
	if(watchedNodeQ.length > 0 && watchedNodeQ[0].textContent && episodePatternRegEx.test(watchedNodeQ[0].textContent)) {
		parsed.type = 'series';
	}

	// Matches when you haven't started this series
	let seriesPatternRegEx = new RegExp(/^Season(\d+)/);
	// Test is showing number of series available
	if(!parsed.type === 'series' && durationNodeQ.length > 0 && durationNodeQ[0].textContent && seriesPatternRegEx.test(durationNodeQ[0].textContent)) {
		parsed.type = 'series';
	}

	return parsed;
};
