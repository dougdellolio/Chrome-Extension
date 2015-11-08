// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function () {
	retrieveTitle();
});

function retrieveTitle() {
	chrome.tabs.getSelected(null, function(tab) {
		tabId = tab.id;
		tabUrl = tab.url;
		 
		var httpRequest = new XMLHttpRequest();

		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {
				var data = httpRequest.responseText;
				var imageData = httpRequest.responseText;
				var parser = new DOMParser();                   
				var xmlDoc;
				var xmlDocForImage;

				try {
				    xmlDoc = parser.parseFromString (data, "text/xml");
				    xmlDocForImage = parser.parseFromString (imageData, "text/xml");
				} catch (e) {
				    return;
				}

				data = xmlDoc.getElementsByTagName('title');
				alert(data[0].innerHTML);
				
			}
		  }

		httpRequest.open("GET", tabUrl, true);
		httpRequest.send();
	});
}




