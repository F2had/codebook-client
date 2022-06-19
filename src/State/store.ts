import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import reducers from "./Reducers";
import rootSaga from "../Sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

export default store;
