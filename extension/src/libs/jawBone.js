import * as icons from './icons';
import {h} from 'dom-chef'; // JSX vDOM

export function enhanceJawBone(details, node) {

	const ratingElement = (
		<a class="">
			{details.title}
			<span>  </span>
		</a>
	);

	/*
	  let newNode = document.createElement('span')
		newNode.innerHTML = 'Loading Ratings'
		newNode.style = 'position:absolute;top:0;left:0;z-index:99999;width:100px;height:100px;background-color:#fff;color:#000;'
		return newNode
	 */

};

export function parseJawBone(node) {

	return {
		title: null,
		type: null,
		year: null
	};

};
