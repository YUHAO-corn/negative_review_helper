/* eslint-disable no-console */
import { isDev } from './is-dev';
export function devWarning(component, message) {
  if (isDev) {
    console.warn(`[react-vant: ${component}] ${message}`);
  }
}