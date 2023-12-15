import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./Slice";

// Redux Thunk middleware - handle async

// 1. export STORE -> using setter from slices
export const store = configureStore({
  reducer: {
    api: apiSlice,
    // semua slice dri yg kita punya, name: nama file slice
  },
});

// const { content } = useSelector(state => state.modal)

// dispatch = memakai fungsi si slice/ file lainay
