/*global chrome*/
(function () {
	'use strict';

	chrome.contextMenus.onClicked.addListener(function (info, tab) {
		window.open('https://followww.co/#/' + info.linkUrl);
	});

	chrome.contextMenus.create({
		id: 'open',
		title: 'followww.',
		contexts: ['link']
	});
}());
