import { Provider } from "react-redux";

import CellList from "./CellList";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import store from "../State/store";

const App = () => {
  return (
    <Provider store={store}>
      <>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList  />
      </>
    </Provider>
  );
};

export default App;
