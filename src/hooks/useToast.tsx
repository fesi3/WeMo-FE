import { RootState } from '@/redux/store';
import { addToast, removeToast, removeFirstToast } from '@/redux/toastReducers';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

type ShowToastStatus = 'success' | 'error' | 'info';
export default function useToast() {
  const toasts = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  const showToast = (status: ShowToastStatus, message: string) => {
    const newToast = { status, message, id: uuidv4() };
    if (toasts.length >= 5) {
      dispatch(removeFirstToast());
    }
    dispatch(addToast(newToast));

    setTimeout(() => {
      dispatch(removeToast(newToast.id));
    }, 2000);
  };

  const closeToast = (id: string) => {
    dispatch(removeToast(id));
  };
  return { showToast, closeToast };
}
