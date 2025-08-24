import React from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import Header from "./components/Header.jsx";
import { UserContextProvider } from "./util/UserContext.jsx";

function App() {
  return (
    <UserContextProvider>
      <Header />
      <AppRoutes />
    </UserContextProvider>
  );
}


export default App;
