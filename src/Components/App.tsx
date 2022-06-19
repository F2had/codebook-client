import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import { Provider } from "react-redux";
import store from "../State/store";

const App = () => {
  return (
    <Provider store={store}>
      <>
        {/* <CodeCell /> */}
        <TextEditor />
      </>
    </Provider>
  );
};

export default App;
