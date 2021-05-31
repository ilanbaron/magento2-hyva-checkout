import { SET_PAGE_LOADER, SET_PAGE_MESSAGE } from './types';

export function setPageLoaderAction(dispatch, loader) {
  dispatch({
    type: SET_PAGE_LOADER,
    payload: loader,
  });
}

export function setMessageAction(dispatch, message) {
  dispatch({
    type: SET_PAGE_MESSAGE,
    payload: message,
  });
}

export function setSuccessMessageAction(dispatch, message) {
  if (typeof window.dispatchMessages !== 'undefined') {
    window.dispatchMessages([{ type: 'success', text: message }], 5000);
    return;
  }
  setMessageAction(dispatch, { type: 'success', message });
}

export function setErrroMessageAction(dispatch, message) {
  if (typeof window.dispatchMessages !== 'undefined') {
    window.dispatchMessages([{ type: 'error', text: message }], 5000);
    return;
  }
  setMessageAction(dispatch, { type: 'error', message });
}
