import OptionsSync from 'webext-options-sync';

// Define defaults
new OptionsSync().define({
	defaults: {
		showSecretCategories: false
	},
	//migrations: [
	//	OptionsSync.migrations.removeUnused
	//]
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.url)

	if (request.action == "fetch") {
		fetch(request.url)
			.then(res => {
				console.log(res)
				if(res.ok) {
					res.json().then(data => {
						sendResponse(data)
					})
				} else {
					sendResponse({error: true})
				}
			})
			.catch(err => sendResponse({error: true}));
	}
	return true; // Keep port open as we want to send a response
});