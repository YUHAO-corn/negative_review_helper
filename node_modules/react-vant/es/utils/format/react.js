import React from 'react';
export function parseChildList(children) {
  return React.Children.toArray(children).map(node => {
    if (React.isValidElement(node)) {
      const key = node.key !== undefined ? String(node.key) : undefined;
      return Object.assign(Object.assign({
        key
      }, node.props), {
        node
      });
    }
    return null;
  }).filter(child => child);
}