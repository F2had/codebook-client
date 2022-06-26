import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import CellList from "./CellList";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import { persistor, store } from "../State/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <>
          {/* <CodeCell /> */}
          {/* <TextEditor /> */}
          <CellList />
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;
