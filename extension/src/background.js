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