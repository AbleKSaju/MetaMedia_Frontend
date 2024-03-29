import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store, persistor } from "./utils/ReduxStore/Store/Store.ts";
import { PersistGate } from "redux-persist/integration/react";
// import SocketProvider from "./utils/context/SocketProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
