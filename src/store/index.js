import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer, // Daftarkan slice customer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger), 
});

export default store;






// // redux/store.js
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { combineReducers } from "redux";
// import { uhuyReducer } from "./uhuy"; // Pastikan ini adalah reducer yang valid
// import customersReducer from './customersReducer'; // Import customersReducer

// // Menggabungkan reducer
// const rootReducer = combineReducers({
//     uhuy: uhuyReducer,
//     customers: customersReducer,
// });

// // Membuat store dengan rootReducer dan middleware
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

