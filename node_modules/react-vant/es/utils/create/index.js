/* eslint-disable no-param-reassign */
import { createBEM } from './bem';
export function createNamespace(name, prefix) {
  name = `${prefix || 'rv'}-${name}`;
  return [createBEM(name), name];
}