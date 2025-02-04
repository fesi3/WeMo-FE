import store from '@/redux/store'; // 스토어 직접 가져오기
import { addToast, removeToast, removeFirstToast } from '@/redux/toastReducers';
import { v4 as uuidv4 } from 'uuid';

type ShowToastStatus = 'success' | 'error' | 'info';
export const showToast = (status: ShowToastStatus, message: string) => {
  const state = store.getState();
  const toasts = state.toast;
  const newToast = { status, message, id: uuidv4() };

  // 토스트가 5개 이상이면 첫 번째 토스트 제거
  if (toasts.length >= 5) {
    store.dispatch(removeFirstToast());
  }

  store.dispatch(addToast(newToast));

  // 토스트는 n초간 유지 커스텀 필요하면 말씀해주세요
  setTimeout(() => {
    store.dispatch(removeToast(newToast.id));
  }, 2000);
};

export const closeToast = (id: string) => {
  store.dispatch(removeToast(id));
};
