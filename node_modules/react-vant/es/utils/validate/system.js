import { inBrowser } from '../base';
export function isAndroid() {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false;
}
export function isIOS() {
  return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
}