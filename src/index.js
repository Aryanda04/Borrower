import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contex/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LayoutComponent from "./component/LayoutComponent";
import Admin from "./pages/admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={<LayoutComponent content={<Home />} />}
          />
          <Route
            exact
            path="/catalog"
            element={<LayoutComponent content={<App />} />}
          />
          <Route
            exact
            path="/admin"
            element={<LayoutComponent content={<Admin />} />}
          />
          {/* <Route exact path="/calon" element={<Form />} />
          <Route exact path="/end" element={<End />} />
        <Route exact path="/result" element={<Result />} /> */}
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
