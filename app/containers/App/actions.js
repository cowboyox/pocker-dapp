export const DEFAULT_LOCALE = 'en';
export const MODAL_ADD = 'acebusters/App/MODAL_ADD';
export const MODAL_DISMISS = 'acebusters/App/MODAL_DISMISS';
export const GLOBAL_PROGRESS = 'acebusters/App/GLOBAL_PROGRESS';

export const modalAdd = ({ modalType, modalProps, closeHandler, backdrop } = {}) => ({
  type: MODAL_ADD,
  payload: { modalType, modalProps, closeHandler, backdrop },
});

export function modalDismiss() {
  return { type: MODAL_DISMISS };
}

export function setProgress(progress) {
  return { type: GLOBAL_PROGRESS, data: progress };
}
