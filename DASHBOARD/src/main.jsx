import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export const context = createContext({ isAutenticated: false });
const AppWrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState(false);
  return (
    <context.Provider
      value={{ isAuthenticated, setisAuthenticated, user, setuser }}
    >
      <App />
    </context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
