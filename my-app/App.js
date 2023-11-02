import Navigate from "./screens/Navigate";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
}
