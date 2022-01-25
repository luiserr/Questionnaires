import * as React from "react";
import {StateProvider} from "./components/hooks/ContextHook";
import Routes from './routes/Routes';

import './styles/app.css';

function App() {
  return (
    <StateProvider>
      <Routes/>
    </StateProvider>
  )

}

export default App;
