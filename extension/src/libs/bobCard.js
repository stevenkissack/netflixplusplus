import * as icons from './icons';
import {h} from 'dom-chef'; // JSX vDOM

export function enhanceBobCard(details, node) {
	let enhanceDom;

	if(details.Error && details.Error !== "") {
		// TODO: Impove Go API to return null on no error
		// TODO: Icon for failure/unknown
		//.Error Will contain the phrase "not found"
		enhanceDom = (
			<span class="npp-wrapper failed">
				N++ Failed
			</span>
		);
	} else {
		enhanceDom = (
			<span class="npp-wrapper">
				<a class="npp-link npp-link-rt" target="_blank" href="imdb-link-todo">
					{details.Title}
				</a>
			</span>
		);
	}
	/*
	  let newNode = document.createElement('span')
		newNode.innerHTML = 'Loading Ratings'
		newNode.style = ''
	 */
	node.appendChild(enhanceDom);
};

export function parseBobCard(node) {
	let parsed = {
		title: null,
		type: null,
		year: null
	};

	let titleNodeQ = node.getElementsByClassName('bob-title')

	if(titleNodeQ.length > 0 && titleNodeQ[0].innerHTML) {
		parsed.title = titleNodeQ[0].innerHTML;
	}
	return parsed;
};
