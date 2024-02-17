//provider.js
"use client";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

export function Providers({ children }) {
  return <Provider store={appStore}>{children}</Provider>;
}