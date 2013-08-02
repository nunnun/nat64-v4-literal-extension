var wr = chrome.webRequest;

var v4_suffix = ".v4";
var saved_v4suffix = localStorage['nat64_v4_suffix'];
if (saved_v4suffix){
  v4_suffix = saved_v4suffix;
}

var ipAddrRegex = /^(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])\.(\d|[01]?\d\d|2[0-4]\d|25[0-5])$/;

function onBeforeRequest(details) {
  var tmpuri = new URI(details.url);
  var tmphost = tmpuri.host();
  var finalUri = '';
  tmphost.replace(ipAddrRegex,function(str, p1, p2, p3, p4, offset, s){
  		finalUri = tmpuri.host(p1+"."+p2+"."+p3+"."+p4+v4_suffix).toString();
	});
 if('' != finalUri) {
 	console.log(finalUri);
 	return {redirectUrl: finalUri};
 }
};

wr.onBeforeRequest.addListener(onBeforeRequest, {urls: ["https://*/*", "http://*/*", "ws://*/*", "wss://*/*", "ftp://*/*"]}, ["blocking"]);
