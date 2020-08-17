
// https://gist.github.com/golman/063e3788447bd878e4fa5e9327617041

// Browser flags by duck typing.

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


export const BrowserFlags = {
  isOpera: isOpera,
  isFirefox: isFirefox,
  isSafari: isSafari,
  isIE: isIE,
  isEdge: isEdge,
  isChrome: isChrome,
  isBlink: isBlink
};


// https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript

var isWin = (navigator.appVersion.indexOf("Win")!=-1);
var isMac = (navigator.appVersion.indexOf("Mac")!=-1);
var isLinux = (navigator.appVersion.indexOf("Linux")!=-1);
var isUnix = (navigator.appVersion.indexOf("X11")!=-1);

export const OsFlags = {
  isWin: isWin,
  isMac: isMac,
  isUnix: isUnix,
  isLinux: isLinux
};
