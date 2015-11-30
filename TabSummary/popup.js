//this will talk to the API and get windows and tabs
function sessionOverview() {
   chrome.tabs.query({}, function(tabs) {
    addToWindowList(tabs);
   });

  //creates the overlay div
  var success = document.createElement('div');
  success.classList.add('overlay');
  success.textContent = 'Session Overview';
  document.body.appendChild(success);
  setTimeout(function() { success.classList.add('visible'); }, 10);
}

//adds the window list to its div
function addToWindowList(list){
  $('#windows').append("Number of Tabs Open: " + list.length);
  var text = "<ul type='circle'>";

  for (i = 0; i < list.length; i++) { 
      text += "<li>" + "URL of Tab " + (i+1) + " = " + list[i].url + "</li>";
  }

  $('#windows').append(text + "</ul>");
}

document.addEventListener('DOMContentLoaded', function () {
  sessionOverview();
  
	var bt = document.getElementById('restoreSessionBt');
  
  bt.addEventListener('click', function() {
  	chrome.sessions.restore(null,null);
  });
});
