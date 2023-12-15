// import { createSlice } from "@reduxjs/toolkit";

// const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     data: [],
//     loading: false,
//     error: "",
//   },
//   reducers: {
//     fetchStart: (state, action) => {
//       state.loading = true;
//       state.error = "";
//     },
//     fetchSuccess: (state, action) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     fetchError: (state, action) => {
//       state.loading = false;
//       state.error = "";
//     },
//   },
// });

// // Actions
// // akan dipanggil dikomponnet
// const { fetchStart, fetchSuccess, fetchError } = menuSlice.actions;

// export function fetchMenus() {
//   return async function (dispatch) {
//     dispatch(fetchStart());

//     try {
//       const res = await fetch(`http://localhost:3000/items`);
//       if (!res.ok) throw new Error("Something wrong!");
//       const data = await res.json();

//       dispatch(fetchSuccess(data));
//     } catch (error) {
//       dispatch(fetchError(error));
//     }
//   };
// }

// // Reducer functions
// // akan dipanggil di store/index.js
// export default menuSlice.reducer; // countIncrement | countDecrement
