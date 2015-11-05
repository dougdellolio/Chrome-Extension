// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.getSelected(null, function(tab) {
	  //properties of tab object
	  tabId = tab.id;
	  tabUrl = tab.url;
	  alert(tabUrl);
	  //rest of the save functionality.
	});
});
