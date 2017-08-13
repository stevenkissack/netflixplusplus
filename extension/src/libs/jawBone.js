import * as icons from './icons';
import {h} from 'dom-chef'; // JSX vDOM

export function enhanceJawBone(details, node) {

	const ratingElement = (
		<a class="">
			{details.title}
			<span>  </span>
		</a>
	);
};

export function parseJawBone(node) {

	return {
		title: null,
		type: null,
		year: null
	};

};
