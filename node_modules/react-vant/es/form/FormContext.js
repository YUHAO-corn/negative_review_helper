import React from 'react';
export const DEFAULT_FORM_CONTEXT = {
  colon: false,
  showValidateMessage: true,
  border: true,
  labelAlign: 'left',
  controlAlign: 'left'
};
export const FormContext = React.createContext(DEFAULT_FORM_CONTEXT);