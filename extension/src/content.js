import OptionsSync from 'webext-options-sync';
import elementReady from 'element-ready';
import select from 'select-dom';
import domLoaded from 'dom-loaded';

// Seperate out each feature
import { parseBobCard, enhanceBobCard } from './libs/bobCard';
import { parseJawBone, enhanceJawBone } from './libs/jawBone';
//import { addSecretCategoryButton } from './libs/secretCategories';

import { fetchInfo } from './libs/api';

import * as icons from './libs/icons';
import { observeEl/*, safeElementReady */} from './libs/utils';

//function addSecretCategoryButton() {
//	safeElementReady('element.class').then(element => {
//		element.prepend(switcher);
//	});
//}

async function init() {
	//const options = await new OptionsSync().getAll();
	await domLoaded;

	// Give Netflix time to do an initial render
	// Maybe remove once we change the observers
	// or use element ready watchers
	setTimeout(() => {
		//if () {
			// TODO: Change scope to improve performance
			observeEl(document, (mutations) => {
				mutations.forEach((mutation) => {
					mutation.addedNodes && mutation.addedNodes.forEach((node) => {

						// Check className each time as mutations seem to be live
						if(node.className && node.className.indexOf && node.className.indexOf('bob-card') !== -1) {
							// TODO: Show loader
							//setLoadingBobCard(node);
							fetchInfo(parseBobCard(node)).then(res => {
								enhanceBobCard(res, node);
							});
						} else if(node.className && node.className.indexOf && node.className.indexOf('jawBone') !== -1) {
							// TODO: Show loader
							//setLoadingJawBone(node);
							fetchInfo(parseJawBone(node)).then(res => {
								enhanceJawBone(res, node);
							});
						}
					})
				})
			}, { childList: true, subtree: true, attributes: true });
		//}
		//if(options.showSecretCategories) {
			//addSecretCategoryButton();
		//}
	}, 2000);
	
}

init();
