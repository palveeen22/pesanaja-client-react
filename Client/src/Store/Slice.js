// 1. grab createSlice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 2. use it to make slice -> 3. make ur state & setter
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    onRequestStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    onRequestOk: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(action.payload);
    },
    onRequestBad: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});

// for components
// 3. export setter
export const { onRequestStart, onRequestOk, onRequestBad } = apiSlice.actions;

export function APIrequest({
  method,
  apiEndpoint,
  options,
  updateContentOnSuccess = false,
  callbackArray = [],
}) {
  return async function (dispatch) {
    try {
      dispatch(onRequestStart());

      const response = await axios({
        method,
        url: apiEndpoint,
        ...options,
        data: options.data,
      });

      // Dispatch another action here
      if (updateContentOnSuccess) {
        dispatch(setContent(response.data.msg));
      }

      dispatch(onRequestOk(response?.data));

      // Call each callback function in the array
      callbackArray.forEach((callback) => {
        callback(response?.data, null);
      });
    } catch (error) {
      dispatch(onRequestBad(error.response?.data.error.msg));
      dispatch(setContent(error.response?.data.error.msg));

      // Call each callback function in the array with an error parameter
      callbackArray.forEach((callback) => {
        callback(null, error);
      });
    }
  };
}
// for index.js (STORE)
// 4. export reducer
export default apiSlice.reducer;

// demo - how to shoot anything with this

/**
 * const options = {
  headers: {
    Authorization: "Bearer your-token",
    // Add any other headers as needed
  },
  data: {
    // Request body for methods like POST, PUT, or PATCH
    key: "value",
  },
  // Add any other Axios options as needed
};

dispatch(fetchApi({ method: "GET", apiEndpoint: "your-get-api-endpoint" }));
dispatch(fetchApi({ method: "POST", apiEndpoint: "your-post-api-endpoint", options }));
dispatch(fetchApi({ method: "PUT", apiEndpoint: "your-put-api-endpoint", options }));
dispatch(fetchApi({ method: "PATCH", apiEndpoint: "your-patch-api-endpoint", options }));
dispatch(fetchApi({ method: "DELETE", apiEndpoint: "your-delete-api-endpoint" }));

 * 
 */
