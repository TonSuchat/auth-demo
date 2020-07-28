import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "bulma/css/bulma.min.css";

import AppRouters from "./components/routers";

function App() {
  return (
    <Router>
      <AppRouters />
    </Router>
  );
}

export default App;
