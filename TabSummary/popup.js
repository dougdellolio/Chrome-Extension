function sessionOverview() {
  chrome.tabs.query({}, function(tabs) {
    addToTabList(tabs);
  });
}

function addToTabList(list){
  $('#tabs').append("<br>Number of Tabs Open: " + list.length);
  var text = "<ul type='circle'>";

  for (i = 0; i < list.length; i++) { 
      text += "<li>" + list[i].url + "</li>";
  }

  chrome.storage.sync.set({ "data" : text }, function() {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
  });

  $('#tabs').append(text + "</ul>");
}

//saves data temporarily because #tabs is removed before you can read from it
function temporarilySaveData(){
  var currentTime =  new Date().toLocaleTimeString().toString();
  var currentDate = new Date();
  var strDate = (currentDate.getMonth()+1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() + ' at ';

  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      addToHistory(strDate + currentTime + items.data);
    }
  });
}

function addToHistory(text) {
  chrome.storage.sync.get({list: []}, function(data) {
    var array = data.list;
    array.unshift(text);
    console.log(array);
    $('#history').append('aaa');
     chrome.storage.sync.set({list:array}, function() {
         console.log("added to list");
     });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('list', function(data) {

    for(element = 0; element < data.list.length; element++){
      var getTime = data.list[element].split("<ul");
      var str = data.list[element];

      //pull out anything in the LI tags
      var result = str.match(/<li>(.*?)<\/li>/g).map(function(val){
        return val.replace(/<\/?li>/g,'');
      });

      $('#history').append('<br><b>' + getTime[0] + '</b>');
      for(i = 0 ; i < result.length; i++) {
        $('#history').append('<ul class="a"><li type = "circle"><a href="'+ result[i] +'">'+ result[i] +'</a></li></ul>');
      }

      $('#history').append("<br>");
    }
  });


  sessionOverview();
});

//when window closes temporarily save data from the DOM
chrome.windows.onRemoved.addListener(function(windowId) {
  temporarilySaveData();
});
