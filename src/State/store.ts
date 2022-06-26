import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./Reducers";

// import { ActionType } from "./Actions/Types";


const store = configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
});




export default store;
