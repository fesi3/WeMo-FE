import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id: string;
  status: 'success' | 'error' | 'info';
  message: string;
}

const initialState: Toast[] = [];

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      const newToast = {
        ...action.payload,
      };
      state.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
    removeFirstToast: (state) => {
      return state.slice(1);
    },
  },
});
export const { addToast, removeToast, removeFirstToast } = toastSlice.actions;

export default toastSlice.reducer;
